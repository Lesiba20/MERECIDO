# MERECIDO storefront

A responsive, front-end-only clothing storefront built with HTML, CSS, vanilla JavaScript, and Vite. Browse the sample collection, filter products, and use the browser-based demo cart. Product names, prices, and stock are demonstration data. Checkout, payments, orders, contact messages, and newsletter signups are not connected to real services.

## Run the site in VS Code

1. Install a current [Node.js LTS release](https://nodejs.org/). npm is included with Node.js.
2. In VS Code, open this project folder and choose **Terminal > New Terminal**.
3. Install the project dependencies:

   ```powershell
   npm install
   ```

4. Start the development server:

   ```powershell
   npm run dev
   ```

5. Hold **Ctrl** and click the local URL shown in the terminal (usually `http://localhost:5173`), or copy it into your browser.
6. To stop the server, click in the terminal and press **Ctrl+C**.

To check the production build, run `npm run build`. To preview that build locally, run `npm run preview` and open the URL Vite prints.

## Make it yours

- **Brand text and page copy:** edit `src/main.js`.
- **Products, prices, sizes, colours, and categories:** edit the `PRODUCTS` and `CATEGORIES` lists in `src/products.js`. Prices are in South African rand.
- **Colours and typography:** edit the variables at the top of `src/style.css`. The palette uses charcoal grey, rich burgundy, deep green, burnt orange, and deep gold.
- **Product and campaign visuals:** original MERECIDO vector illustrations are in `public/images`; change their paths and alt text in `src/images.js`. These are artwork mockups, not product photographs. When ready, place your own product photos in `public/images` and update the matching image entries, for example `"/images/my-product.jpg"`.
- **Visual direction:** the campaign and lookbook use cinematic framing and curated image-board inspiration from ShotDeck and Savee. No images from those websites or third-party photos are included.
- **Browser cart:** the cart is saved in your browser's local storage for this demo.

The main navigation, collection filters, mobile menu, product options, cart quantity controls, and remove buttons work locally. The contact form and newsletter form only show demo feedback; they do not send or save information.

## Deploy to Render

The root `render.yaml` configures a static site called `merecido`, built from the `main` branch. Render installs the existing npm dependencies, runs the Vite production build, and publishes the generated `dist` folder. Automatic deploys are enabled.

To connect it to Render:

1. Sign in to the [Render Dashboard](https://dashboard.render.com/).
2. Choose **New +** → **Blueprint**.
3. Connect the GitHub account that can access `Lesiba20/MERECIDO`, and select the `MERECIDO` repository.
4. Select the `main` branch and confirm the Blueprint. Render will read `render.yaml`, build the storefront, and show the published URL when the deploy finishes.

If you already have a Render account but cannot select the repository, first grant Render access to `Lesiba20/MERECIDO` in your GitHub application's repository-access settings. This deployment needs no API keys or secret environment variables.

Before accepting real orders, connect a supported commerce platform and configure verified inventory, prices, shipping, taxes, policies, contact details, and payment handling. Never treat this browser-only cart as an order or payment.
