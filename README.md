# Developer Website

A static, dependency-free website for an App Store developer: home page with your apps,
Privacy Policy, Terms of Use, and a Contact & Support page. Works on any static host.

## 1. Personalize (5 minutes)

Edit **`assets/site.config.js`** — every name, email, address, and date on the site is
pulled from this one file. The default placeholder values are "Your Studio", so search
for that text if you want to double-check nothing was missed.

Then, in **`index.html`**, replace the three example app cards in the `<section id="apps">`
block with your real apps (name, description, tags, and App Store link).

Optional: change the letter in the `.brand-mark` element (header and footer of every page),
or replace it with an `<img>` of your logo.

## 2. Review the legal pages

`privacy.html` and `terms.html` are written for a typical independent iOS/macOS developer:
on-device storage, optional iCloud sync, Apple-processed purchases, opt-in crash reports,
no advertising. If an app uses extra services (a third-party analytics SDK, your own
backend, sign-in with a social provider), add them to the table in Privacy Policy §6 and
adjust the related sections. These templates are a strong starting point but are not
legal advice; have a lawyer review them for your jurisdiction.

## 3. Deploy

Any static host works. Upload the whole folder (keep `assets/` beside the HTML files):

- **GitHub Pages**: push to a repo, Settings → Pages → deploy from `main` root.
- **Netlify / Vercel / Cloudflare Pages**: drag the folder in or connect the repo. No build step.
- **Traditional hosting**: upload via SFTP to your `public_html` folder.

## 4. Add the URLs to App Store Connect

- Support URL → `https://yourdomain.com/contact.html`
- Privacy Policy URL → `https://yourdomain.com/privacy.html`
- Marketing URL (optional) → `https://yourdomain.com/`
- EULA: leave Apple's Standard EULA selected, or link `terms.html` as a custom EULA.
