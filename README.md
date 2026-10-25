# Snehatheeram Kidangara — Official Website

**Pope John XXIII Rehabilitation & Old Age Women Care Center**  
*A Home of Love, Dignity, and Care for Elderly and Destitute Women.*  
Kidangara, Kuttanad, Alappuzha District, Kerala - 686 102  
Managed by **St. Joseph Province, Changanassery / Sisters of St. Charles Borromeo**

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React (`lucide-react`)
- **Typography:** Plus Jakarta Sans & Manrope

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

3. **Type-check the codebase:**
   ```bash
   npm run lint
   ```

4. **Create a production build:**
   ```bash
   npm run build
   ```
   The static production bundle is generated in the `dist/` directory.

---

## Customizing Photos, Logo & Bank Details

All organization details, service descriptions, contact numbers, image paths, and optional bank details are centralized in:

- `src/config/siteConfig.ts`

### Adding Verified Bank / UPI Details
By default, `SITE_CONFIG.bankDetails.isConfigured` is set to `false` so no unverified bank numbers are displayed, and visitors are guided to request official transfer details directly from the Sisters via WhatsApp (`+91 9400272087`), telephone (`0477-2713871`), or email (`sanjochry@gmail.com`).

When verified bank details are ready, open `src/config/siteConfig.ts` and update `bankDetails`:
```ts
bankDetails: {
  isConfigured: true,
  accountName: '...',
  bankName: '...',
  branchName: 'Kidangara',
  accountNumber: '...',
  ifscCode: '...',
  upiId: '...',
}
```

---

## Deploying to Vercel

This project includes a preconfigured `vercel.json` for single-page application (SPA) routing and builds directly to `dist/`.

### Option A: Deploy via Vercel Dashboard (GitHub / GitLab / Bitbucket)
1. Push this repository to your Git provider.
2. Log in to [Vercel](https://vercel.com) and click **Add New... → Project**.
3. Import the repository.
4. Confirm the build settings (Vercel detects Vite automatically):
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
# For production deployment:
vercel --prod
```
