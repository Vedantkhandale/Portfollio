import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const databasePath = path.join(dataDir, "portfolio.sqlite");
const port = Number(process.env.PORT || 3000);

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const db = new DatabaseSync(databasePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    service TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

const insertContact = db.prepare(`
  INSERT INTO contacts (name, email, company, service, budget, message)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const countContacts = db.prepare("SELECT COUNT(*) AS total FROM contacts");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function sanitizeText(value, maxLength) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let rawBody = "";

    request.on("data", (chunk) => {
      rawBody += chunk;
      if (rawBody.length > 1_000_000) {
        reject(new Error("Payload too large"));
        request.destroy();
      }
    });

    request.on("end", () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });
}

async function serveStatic(requestPath, response) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const safePath = path.normalize(normalizedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    sendJson(response, 403, { ok: false, message: "Forbidden" });
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      throw new Error("Not a file");
    }

    const extension = path.extname(filePath).toLowerCase();
    const file = await readFile(filePath);

    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=604800"
    });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end("<h1>404</h1><p>Page not found.</p>");
  }
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host}`);
  const { pathname } = requestUrl;

  if (request.method === "GET" && pathname === "/api/health") {
    const { total } = countContacts.get();
    sendJson(response, 200, {
      ok: true,
      submissions: total,
      updatedAt: new Date().toISOString()
    });
    return;
  }

  if (request.method === "POST" && pathname === "/api/contact") {
    try {
      const payload = await parseJsonBody(request);
      const name = sanitizeText(payload.name, 80);
      const email = sanitizeText(payload.email, 120).toLowerCase();
      const company = sanitizeText(payload.company, 120) || "Independent";
      const service = sanitizeText(payload.service, 80);
      const budget = sanitizeText(payload.budget, 80);
      const message = sanitizeText(payload.message, 1000);

      if (!name || !email || !service || !budget || !message) {
        sendJson(response, 400, {
          ok: false,
          message: "Please complete all required fields."
        });
        return;
      }

      if (!isValidEmail(email)) {
        sendJson(response, 400, {
          ok: false,
          message: "Please enter a valid email address."
        });
        return;
      }

      insertContact.run(name, email, company, service, budget, message);
      const { total } = countContacts.get();

      sendJson(response, 201, {
        ok: true,
        message: "Message saved successfully. I will get back to you soon.",
        submissions: total
      });
      return;
    } catch (error) {
      const statusCode = error.message === "Payload too large" ? 413 : 400;
      sendJson(response, statusCode, {
        ok: false,
        message: error.message === "Payload too large"
          ? "Your message is too large."
          : "Unable to process your request."
      });
      return;
    }
  }

  if (request.method !== "GET") {
    sendJson(response, 405, {
      ok: false,
      message: "Method not allowed."
    });
    return;
  }

  await serveStatic(pathname, response);
});

server.listen(port, () => {
  console.log(`Portfolio server running on http://localhost:${port}`);
  console.log(`SQLite storage ready at ${databasePath}`);
});
