# Couple Coffee — Landing Page

A lightweight, responsive landing page for a coffee shop called "Couple Coffee". This project is a simple front-end exercise containing HTML, CSS and JavaScript with a responsive navigation menu and several content sections (hero, features, gallery, contact footer).

## Project files

- `index.html` — Main HTML document and entry point.
- `style.css` — All styling and responsive rules.
- `script.js` — Small script to toggle the mobile navigation icon and slide-in menu.

Most images and icons are loaded from external CDNs (Unsplash, Cloudinary, Icons8, Font Awesome).

## How to view locally (PowerShell)

You can simply open `index.html` in your browser by double-clicking it. For a more realistic environment (recommended for some browser features), run a simple local HTTP server.

If you have Python 3 installed, run from the project folder:

```powershell
# start a simple HTTP server on port 8000
python -m http.server 8000
# then open http://localhost:8000/ in your browser
```

If you use VS Code, you can also use the Live Server extension to preview the page with live reload.

## Notes & next steps

- Accessibility: add ARIA labels and improve keyboard navigation for the mobile menu.
- Forms: hook the contact form to a backend or a form service if you want to capture messages.
- Optimization: locally bundle or host images to avoid external requests and add alt text improvements.
- Add tests or CI if you expand this into a larger project.

## License

This repository is provided as-is for learning and demonstration purposes. Use or adapt freely.

## Author

Rishab Mahor — connect.rishabmahor@gmail.com

(Generated README added to the project on 2025-10-05.)
