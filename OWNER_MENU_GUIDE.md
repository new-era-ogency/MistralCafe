# Mistral Menu Editing Guide

This lets you update menu items without touching code.

## One-time setup (developer)

1. Open `admin/config.yml`.
2. Replace `YOUR_GITHUB_USERNAME/mistral` with your real GitHub repo path.
3. Commit and publish these files.
4. Open `https://<your-site-domain>/admin/`.

Note: Decap CMS with GitHub backend needs OAuth. The easiest production setup is Netlify Identity + Git Gateway, or a GitHub OAuth proxy for Decap.

## How to log in

1. Go to `/admin/` on your website.
2. Sign in with the configured GitHub auth flow.
3. Open **Menu Content**.

## Change a price (example)

1. In **Menu JSON**, open **Items**.
2. Select the item you want (for example `sea-platter`).
3. Update the **Price** field (example: `41.00` -> `43.00`).
4. Save.
5. Click **Publish** (or request review, depending on workflow).

## Images

- Uploads go to `assets/images/`.
- The menu item image is controlled by the `imagePath` field.