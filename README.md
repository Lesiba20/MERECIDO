# VVS DELUXE storefront prototype

A responsive, front-end-only VVS DELUXE streetwear storefront built with HTML, CSS, vanilla JavaScript, and Vite. The catalogue, stock status, and prices are demonstration data. The cart is stored in the current browser for demo purposes; this site does not accept payment or submit orders.

## Run locally

1. Install a current Node.js LTS release.
2. In this project folder, install the development dependency:

   ```sh
   npm install
   ```

3. Start the local development server:

   ```sh
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

Create a production preview with `npm run build`, then `npm run preview`.

## Deploy to Render

This project is configured as a Render static site in `render.yaml`.

1. Push the project files to a GitHub repository that Render can access.
2. In the Render Dashboard, choose **New > Blueprint** and connect that repository. Render will read `render.yaml` and build the static site.
3. Alternatively, choose **New > Static Site** and use:
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
4. When the deploy finishes, open the `onrender.com` URL shown in the service dashboard. Add a custom domain from the service settings if you have one.

The app uses hash-based navigation (for example, `/#/shop`), so page views work on the static host without server-side routing rules. No environment variables or backend service are needed for this demo.

## Project files

- `index.html` — document metadata, font loading, and the app mount point.
- `src/main.js` — page rendering, navigation, catalogue controls, form demo states, and cart behavior.
- `src/products.js` — editable demonstration product catalogue and category list.
- `src/images.js` — centralized temporary remote image URLs and alt text for the lookbook.
- `src/style.css` — design tokens, shared components, and responsive layouts.
- `render.yaml` — Render static-site build and publish configuration.

The site uses hash URLs for Home, Shop, Product details, About, Lookbook, Contact, Cart, and FAQ/policies. Change the product array in `src/products.js` to edit the sample catalogue. Replace the temporary image URLs in `src/images.js` with approved local campaign assets when available.

## Before accepting real orders

Connect a commerce service such as Shopify (for example, Shopify Storefront API plus Shopify-hosted checkout) or another supported commerce platform. Move authoritative inventory, prices, tax, shipping, order creation, and payment confirmation to that service; never treat this browser-only cart as proof of an order or payment. Also configure a real contact/newsletter provider, verified product and campaign imagery, business contact details, delivery and returns policies, privacy notices, and terms before launch. Keep any private credentials on a secure server, not in browser JavaScript.
