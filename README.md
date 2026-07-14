# Portfolio Studio

A premium single-page portfolio built with HTML, CSS, JavaScript, Bootstrap, Node.js, and SQLite-backed contact storage.

## Features

- Bold responsive design with custom motion and section sequencing
- Bootstrap 5 layout enhanced by custom CSS styling
- Vanilla JavaScript for reveals, counters, filters, and contact UX
- Native Node.js server that serves static files and handles form submissions
- SQLite database for saving contact messages locally in `data/portfolio.sqlite`
- Central editable content file so you can update most text from one place

## Run locally

```bash
npm start
```

Then open `http://localhost:3000`.

## Edit your information

Update your personal details, hero text, services, projects, skills, contact points, and social links in `assets/js/content.js`.

Main editable files:

- `assets/js/content.js` for all text, cards, projects, contact data, and links
- `index.html` only if you want structural changes
- `assets/css/style.css` only if you want design tweaks

## Development mode

```bash
npm run dev
```

## Notes

- Requires Node.js `24+` because it uses the built-in `node:sqlite` module.
- Starting the server creates `data/portfolio.sqlite` automatically if it does not already exist.
- Update the text content in `index.html` to personalize names, projects, and links.
