# Deploy / Update the site

The live site is built and served from the **main** branch at https://ak-apoorvkulkarni.github.io.

**To update the site after changing code:**

1. Commit your changes on your local `main` branch.
2. Push to the **source** branch (this triggers the build and deploy to main):

   ```bash
   git push origin main:source
   ```

3. Wait 1–2 minutes. The GitHub Action will build and deploy to **main**; the site will update automatically.

**Branches:**

- **main** – built site only (what GitHub Pages serves). Do not push source code here.
- **source** – full React app source. Push here to trigger a new deploy.
