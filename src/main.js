import { CATEGORIES, PRODUCTS } from "./products.js";
import { IMAGES } from "./images.js";

const CART_STORAGE_KEY = "vvs-deluxe-demo-cart";
const app = document.querySelector("#app");

const state = {
  cart: loadCart(),
  selectedSize: "",
  selectedColor: "",
  category: "All",
  sort: "featured",
  search: "",
  feedback: ""
};

const money = (amount) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(amount);

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(savedCart)) return [];

    return savedCart.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        PRODUCTS.some((product) => product.id === item.productId) &&
        typeof item.size === "string" &&
        typeof item.color === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
  } catch (error) {
    console.warn("The saved demo cart could not be read; starting with an empty cart.", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    return true;
  } catch (error) {
    console.error("The demo cart could not be saved in this browser.", error);
    return false;
  }
}

function cartCount() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function cartSubtotal() {
  return state.cart.reduce((total, item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function image(url, alt, className = "") {
  return `<img class="${className}" src="${url}" alt="${alt}" loading="lazy" />`;
}

function header() {
  const activeRoute = route().path;
  const navItems = [
    ["/", "Home"],
    ["/shop", "Shop"],
    ["/about", "About"],
    ["/lookbook", "Lookbook"],
    ["/contact", "Contact"]
  ];

  return `
    <div class="announcement">VVS DELUXE <span>—</span> STREETWEAR WITH INTENT.</div>
    <header class="site-header">
      <a class="wordmark" href="#/" aria-label="VVS DELUXE home">VVS<span>DELUXE</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span class="menu-toggle-label">Menu</span><span class="menu-icon" aria-hidden="true"></span>
      </button>
      <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
        ${navItems
          .map(
            ([path, label]) => `
              <a href="#${path}" ${activeRoute === path ? 'aria-current="page"' : ""}>${label}</a>
            `
          )
          .join("")}
      </nav>
      <a class="bag-link" href="#/cart" aria-label="Shopping bag, ${cartCount()} items">
        BAG <span class="bag-count">${cartCount()}</span>
      </a>
    </header>
    <div class="site-feedback" role="status" aria-live="polite">${state.feedback}</div>
  `;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-main">
        <div class="footer-brand">
          <a class="wordmark" href="#/" aria-label="VVS DELUXE home">VVS<span>DELUXE</span></a>
          <p>BUILT DIFFERENT.<br />WORN WITH INTENT.</p>
        </div>
        <div class="footer-column">
          <h2>Explore</h2>
          <a href="#/shop">Shop the collection</a>
          <a href="#/about">Our story</a>
          <a href="#/lookbook">Lookbook</a>
          <a href="#/contact">Contact</a>
        </div>
        <div class="footer-column">
          <h2>Information</h2>
          <a href="#/faq">FAQ &amp; policies</a>
          <a href="#/cart">Your bag</a>
          <span class="footer-note">Social links and contact details will be added when configured.</span>
        </div>
        <div class="footer-column footer-news">
          <h2>Stay in the loop</h2>
          <p>Drop updates, stories, and considered essentials.</p>
          <form class="newsletter-form">
            <label class="sr-only" for="newsletter-email">Email address</label>
            <input id="newsletter-email" name="email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Join the newsletter">JOIN <span aria-hidden="true">↗</span></button>
          </form>
          <p class="form-note">Demo only — email addresses are not stored or sent.</p>
          <p class="newsletter-feedback" aria-live="polite"></p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} VVS DELUXE. DEMONSTRATION STOREFRONT.</span>
        <span>MENLYN, PRETORIA · SOUTH AFRICA</span>
      </div>
    </footer>
  `;
}

function productCard(product) {
  return `
    <article class="product-card">
      <a class="product-image-link" href="#/product/${product.id}" aria-label="View ${product.name}">
        ${image(product.image, product.alt, "product-image")}
        ${!product.available ? '<span class="stock-label">Coming soon</span>' : ""}
      </a>
      <div class="product-card-info">
        <div>
          <p class="eyebrow">${product.category}</p>
          <h3><a href="#/product/${product.id}">${product.name}</a></h3>
        </div>
        <span class="product-price">${money(product.price)}</span>
      </div>
    </article>
  `;
}

function productGrid(products) {
  return products.map(productCard).join("");
}

function homePage() {
  const featured = PRODUCTS.slice(0, 4);
  const categories = [
    ["Hoodies", "01 / LAYERS", IMAGES.products.afterHoursHoodie],
    ["Tees", "02 / EVERYDAY", IMAGES.products.offScriptTee],
    ["Caps", "03 / DETAILS", IMAGES.products.districtCap],
    ["Footwear", "04 / MOVEMENT", IMAGES.products.concreteRunner]
  ];

  return `
    <main id="main-content">
      <section class="hero">
        ${image(
          IMAGES.hero,
          "Streetwear campaign portrait against an urban backdrop",
          "hero-image"
        )}
        <div class="hero-shade"></div>
        <div class="hero-content">
          <p class="eyebrow hero-kicker">INDEPENDENT STREETWEAR · PRETORIA, ZA</p>
          <h1><span class="hero-line hero-line-first">NOT MADE TO</span><span class="hero-line">BLEND IN.</span></h1>
          <p class="hero-copy">Premium streetwear inspired by urban culture, individuality, and the energy of Gauteng.</p>
          <div class="hero-actions">
            <a class="button button-light" href="#/shop">SHOP THE DROP <span aria-hidden="true">↗</span></a>
            <a class="text-link text-link-light" href="#/about">DISCOVER THE BRAND <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <span class="hero-index">01 — VVS DELUXE</span>
      </section>

      <section class="section category-section">
        <div class="section-heading">
          <div><p class="eyebrow">FIND YOUR FREQUENCY</p><h2>THE UNIFORM,<br />REIMAGINED.</h2></div>
          <a class="text-link" href="#/shop">VIEW ALL CATEGORIES <span aria-hidden="true">↗</span></a>
        </div>
        <div class="category-grid">
          ${categories
            .map(
              ([category, note, categoryImage], index) => `
                <a class="category-tile category-tile-${index + 1}" href="#/shop?category=${encodeURIComponent(category)}">
                  <img class="category-tile-image" src="${categoryImage}" alt="" loading="lazy" />
                  <span class="category-number">${note}</span>
                  <span class="category-name">${category}</span>
                  <span class="category-arrow" aria-hidden="true">↗</span>
                </a>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section featured-section">
        <div class="section-heading">
          <div><p class="eyebrow">CURATED FOR THE CITY</p><h2>IN ROTATION.</h2></div>
          <a class="text-link" href="#/shop">SHOP THE COLLECTION <span aria-hidden="true">↗</span></a>
        </div>
        <p class="demo-note">Sample products and prices shown for demonstration purposes.</p>
        <div class="product-grid">${productGrid(featured)}</div>
      </section>

      <section class="brand-statement">
        <p class="eyebrow">NO PERMISSION REQUIRED</p>
        <h2>YOUR STYLE.<br /><span>YOUR RULES.</span></h2>
        <a class="text-link text-link-light" href="#/about">GET TO KNOW VVS <span aria-hidden="true">↗</span></a>
        <span class="statement-mark" aria-hidden="true">VVS</span>
      </section>

      <section class="section lookbook-preview">
        <div class="section-heading">
          <div><p class="eyebrow">OUTSIDE THE ORDINARY</p><h2>FRAME OF MIND.</h2></div>
          <a class="text-link" href="#/lookbook">ENTER THE LOOKBOOK <span aria-hidden="true">↗</span></a>
        </div>
        <div class="lookbook-teaser">
          ${image(
            IMAGES.lookbookPreview,
            "Streetwear editorial portrait in an urban setting"
          )}
          ${image(
            IMAGES.lookbookPreviewSecondary,
            "Urban fashion editorial on a city street"
          )}
          <a class="lookbook-callout" href="#/lookbook">
            <span class="eyebrow">VOLUME 01 / GAUTENG</span>
            <span>THE CITY<br />IS THE CANVAS.</span>
            <span class="text-link text-link-light">EXPLORE <span aria-hidden="true">↗</span></span>
          </a>
        </div>
      </section>
    </main>
  `;
}

function shopPage() {
  const params = route().params;
  const initialCategory = CATEGORIES.includes(params.get("category"))
    ? params.get("category")
    : "All";
  state.category = initialCategory;

  return `
    <main id="main-content" class="page-shell">
      <section class="page-intro shop-intro">
        <p class="eyebrow">VVS DELUXE / THE COLLECTION</p>
        <h1>THE<br /><span>COLLECTION.</span></h1>
        <p>Everyday essentials. Elevated streetwear. Explore the VVS DELUXE collection and find the pieces that speak your language.</p>
      </section>
      <div class="shop-notice">DEMONSTRATION DATA — sample inventory, names, and prices only.</div>
      <section class="shop-section" aria-label="Shop products">
        <div class="shop-toolbar">
          <label class="search-field">
            <span class="sr-only">Search products</span>
            <input id="product-search" type="search" placeholder="Search the collection" value="${escapeAttribute(state.search)}" />
          </label>
          <label class="select-field"><span class="sr-only">Filter by category</span>
            <select id="category-filter">
              <option value="All">All categories</option>
              ${CATEGORIES.map((category) => `<option value="${category}" ${state.category === category ? "selected" : ""}>${category}</option>`).join("")}
            </select>
          </label>
          <label class="select-field"><span class="sr-only">Sort products</span>
            <select id="sort-products">
              <option value="featured" ${state.sort === "featured" ? "selected" : ""}>Featured</option>
              <option value="price-low" ${state.sort === "price-low" ? "selected" : ""}>Price: low to high</option>
              <option value="price-high" ${state.sort === "price-high" ? "selected" : ""}>Price: high to low</option>
            </select>
          </label>
        </div>
        <p class="results-count" id="results-count" aria-live="polite"></p>
        <div class="product-grid shop-grid" id="product-grid"></div>
      </section>
    </main>
  `;
}

function productPage(id) {
  const product = PRODUCTS.find((entry) => entry.id === id);
  if (!product) return notFoundPage();

  state.selectedSize = product.sizes.length === 1 ? product.sizes[0] : "";
  state.selectedColor = product.colors[0];

  return `
    <main id="main-content" class="page-shell product-detail-page">
      <p class="breadcrumbs"><a href="#/">HOME</a><span>/</span><a href="#/shop">SHOP</a><span>/</span>${product.name.toUpperCase()}</p>
      <section class="product-detail">
        <div class="product-detail-image">${image(product.image, product.alt)}</div>
        <div class="product-detail-info">
          <p class="eyebrow">${product.category} / VVS DELUXE</p>
          <h1>${product.name}</h1>
          <p class="detail-price">${money(product.price)}</p>
          <p class="detail-description">${product.description}</p>
          <p class="demo-note">Demonstration product — not available for real purchase.</p>
          ${
            product.available
              ? `
                <label class="detail-option" for="product-size">SIZE
                  <select id="product-size" ${product.sizes.length === 1 ? "disabled" : ""}>
                    ${product.sizes.map((size) => `<option value="${size}" ${state.selectedSize === size ? "selected" : ""}>${size}</option>`).join("")}
                  </select>
                </label>
                <label class="detail-option" for="product-color">COLOUR
                  <select id="product-color">
                    ${product.colors.map((color) => `<option value="${color}" ${state.selectedColor === color ? "selected" : ""}>${color}</option>`).join("")}
                  </select>
                </label>
                <button class="button button-dark add-to-cart" type="button" data-action="add-to-cart" data-product-id="${product.id}">
                  ADD TO BAG <span aria-hidden="true">↗</span>
                </button>
              `
              : '<p class="unavailable-message">This sample item is marked as coming soon.</p>'
          }
          <p class="detail-disclaimer">This prototype does not take payment or submit orders.</p>
        </div>
      </section>
    </main>
  `;
}

function aboutPage() {
  return `
    <main id="main-content" class="page-shell about-page">
      <section class="page-intro">
        <p class="eyebrow">INDEPENDENT BY DESIGN</p>
        <h1>MADE OF<br /><span>MORE.</span></h1>
      </section>
      <section class="about-layout">
        ${image(
          IMAGES.about,
          "Streetwear editorial portrait reflecting independent style"
        )}
        <div class="about-copy">
          <p>VVS DELUXE is an independent streetwear concept inspired by urban culture, individual expression, and the energy of Gauteng.</p>
          <p>Our vision is simple: bring together bold design, considered details, and everyday wearability. From oversized silhouettes to clean essentials, every piece should help you express who you are without saying a word.</p>
          <p>We are building a brand that represents confidence, creativity, and a new perspective on everyday streetwear.</p>
          <p class="about-signoff">VVS DELUXE.<br />BUILT DIFFERENT. WORN WITH INTENT.</p>
        </div>
      </section>
    </main>
  `;
}

function lookbookPage() {
  return `
    <main id="main-content" class="page-shell lookbook-page">
      <section class="page-intro">
        <p class="eyebrow">VOLUME 01 / THE CITY IS THE CANVAS</p>
        <h1>FRAME OF<br /><span>MIND.</span></h1>
        <p>A visual study of style, space, and the energy that moves through Gauteng.</p>
      </section>
      <section class="lookbook-grid" aria-label="Lookbook editorial images">
        ${IMAGES.lookbook
          .map(
            ([photo, alt], index) => `
              <figure class="lookbook-frame lookbook-frame-${index + 1}">
                ${image(photo, alt)}
                <figcaption>VVS / FIELD NOTES — 0${index + 1}</figcaption>
              </figure>
            `
          )
          .join("")}
      </section>
      <p class="demo-note">Editorial imagery is temporary remote photography and can be replaced with original campaign assets.</p>
    </main>
  `;
}

function contactPage() {
  return `
    <main id="main-content" class="page-shell contact-page">
      <section class="page-intro">
        <p class="eyebrow">WE'RE LISTENING</p>
        <h1>LET'S<br /><span>TALK.</span></h1>
        <p>Questions about a product, sizing, an order, or a potential collaboration? Get in touch with the VVS DELUXE team.</p>
      </section>
      <section class="contact-layout">
        <div class="contact-side-note">
          <p class="eyebrow">START A CONVERSATION</p>
          <p>Share a little context and we’ll be ready to talk when a contact service is connected.</p>
          <p class="demo-note">This form is a demo. It does not send or store messages.</p>
        </div>
        <form class="contact-form">
          <label for="contact-name">NAME <span aria-hidden="true">*</span>
            <input id="contact-name" name="name" autocomplete="name" required />
          </label>
          <label for="contact-email">EMAIL <span aria-hidden="true">*</span>
            <input id="contact-email" name="email" type="email" autocomplete="email" required />
          </label>
          <label for="contact-subject">SUBJECT <span aria-hidden="true">*</span>
            <input id="contact-subject" name="subject" required />
          </label>
          <label for="contact-message">MESSAGE <span aria-hidden="true">*</span>
            <textarea id="contact-message" name="message" rows="5" required></textarea>
          </label>
          <button class="button button-dark" type="submit">PREVIEW MESSAGE <span aria-hidden="true">↗</span></button>
          <p class="contact-feedback" role="status" aria-live="polite"></p>
        </form>
      </section>
    </main>
  `;
}

function cartPage() {
  const entries = state.cart
    .map((item) => {
      const product = PRODUCTS.find((entry) => entry.id === item.productId);
      if (!product) return "";
      return `
        <article class="cart-item">
          <a class="cart-item-image" href="#/product/${product.id}">${image(product.image, product.alt)}</a>
          <div class="cart-item-info">
            <p class="eyebrow">${product.category}</p>
            <h2><a href="#/product/${product.id}">${product.name}</a></h2>
            <p>Size: ${escapeHtml(item.size)} <span class="cart-separator">/</span> Colour: ${escapeHtml(item.color)}</p>
            <button class="remove-link" type="button" data-action="remove" data-product-id="${product.id}" data-size="${escapeAttribute(item.size)}" data-color="${escapeAttribute(item.color)}">REMOVE</button>
          </div>
          <div class="cart-item-controls">
            <div class="quantity-control" aria-label="Quantity for ${product.name}">
              <button type="button" data-action="decrease" data-product-id="${product.id}" data-size="${escapeAttribute(item.size)}" data-color="${escapeAttribute(item.color)}" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-action="increase" data-product-id="${product.id}" data-size="${escapeAttribute(item.size)}" data-color="${escapeAttribute(item.color)}" aria-label="Increase quantity">+</button>
            </div>
            <span>${money(product.price * item.quantity)}</span>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <main id="main-content" class="page-shell cart-page">
      <section class="page-intro cart-intro">
        <p class="eyebrow">YOUR SELECTION</p>
        <h1>THE<br /><span>BAG.</span></h1>
      </section>
      ${
        state.cart.length
          ? `
            <div class="cart-layout">
              <section class="cart-items" aria-label="Items in your bag">
                <div class="cart-list-heading"><span>ITEM</span><span>QUANTITY / TOTAL</span></div>
                ${entries}
              </section>
              <aside class="cart-summary">
                <p class="eyebrow">DEMO CART</p>
                <div class="subtotal-row"><span>Subtotal</span><strong>${money(cartSubtotal())}</strong></div>
                <p>Shipping and taxes are not calculated in this demonstration.</p>
                <button class="button button-dark" type="button" disabled>CHECKOUT NOT CONFIGURED</button>
                <p class="detail-disclaimer">No payment will be taken and no order will be submitted.</p>
                <a class="text-link" href="#/shop">CONTINUE SHOPPING <span aria-hidden="true">↗</span></a>
              </aside>
            </div>
          `
          : `
            <section class="empty-cart">
              <p class="eyebrow">NOTHING IN HERE — YET.</p>
              <h2>Your bag is taking a breather.</h2>
              <p>Explore the demonstration collection and find a piece that feels like you.</p>
              <a class="button button-dark" href="#/shop">EXPLORE THE COLLECTION <span aria-hidden="true">↗</span></a>
            </section>
          `
      }
    </main>
  `;
}

function faqPage() {
  const questions = [
    ["Is this a live store?", "No. This is a front-end demonstration. Products, prices, and stock are sample data; checkout and real orders are not configured."],
    ["How do I choose a size?", "Size options are examples only. Add a verified size guide and product measurements before offering real stock."],
    ["How do delivery and returns work?", "Shipping, delivery times, and return terms have not been configured. Publish clear, legally reviewed policies before taking orders."],
    ["Does the contact form send my message?", "No. The form only demonstrates front-end validation and feedback. Messages are not sent or stored."],
    ["Can I purchase these products?", "No. The add-to-bag and cart features are for demonstration only; no payment is taken and no order is submitted."]
  ];

  return `
    <main id="main-content" class="page-shell faq-page">
      <section class="page-intro">
        <p class="eyebrow">THE DETAILS</p>
        <h1>GOOD TO<br /><span>KNOW.</span></h1>
        <p>Helpful answers about this VVS DELUXE storefront prototype.</p>
      </section>
      <section class="faq-list" aria-label="Frequently asked questions">
        ${questions
          .map(
            ([question, answer]) => `
              <details>
                <summary>${question}<span aria-hidden="true">+</span></summary>
                <p>${answer}</p>
              </details>
            `
          )
          .join("")}
      </section>
      <p class="policy-placeholder">Shipping, returns, privacy, and terms policies must be configured and reviewed before this site is used for real sales.</p>
    </main>
  `;
}

function notFoundPage() {
  return `
    <main id="main-content" class="page-shell not-found">
      <p class="eyebrow">404 / WRONG TURN</p>
      <h1>THIS PAGE<br /><span>DOESN'T EXIST.</span></h1>
      <a class="button button-dark" href="#/">BACK TO HOME <span aria-hidden="true">↗</span></a>
    </main>
  `;
}

function route() {
  // Keep routing dependency-free while allowing category filters in the hash query.
  const [path = "/", query = ""] = window.location.hash.slice(1).split("?");
  return { path: path || "/", params: new URLSearchParams(query) };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character];
  });
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function renderShopProducts() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;

  let results = PRODUCTS.filter((product) => {
    const matchesCategory = state.category === "All" || product.category === state.category;
    const matchesSearch = product.name.toLowerCase().includes(state.search.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  if (state.sort === "price-low") results = results.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") results = results.sort((a, b) => b.price - a.price);

  grid.innerHTML = results.length
    ? productGrid(results)
    : '<p class="no-results">No pieces match that search. Try another name or category.</p>';
  document.querySelector("#results-count").textContent = `${results.length} ${results.length === 1 ? "piece" : "pieces"} shown`;
}

function render() {
  const current = route();
  let page;

  if (current.path === "/") page = homePage();
  else if (current.path === "/shop") page = shopPage();
  else if (current.path.startsWith("/product/")) page = productPage(current.path.slice("/product/".length));
  else if (current.path === "/about") page = aboutPage();
  else if (current.path === "/lookbook") page = lookbookPage();
  else if (current.path === "/contact") page = contactPage();
  else if (current.path === "/cart") page = cartPage();
  else if (current.path === "/faq") page = faqPage();
  else page = notFoundPage();

  app.innerHTML = `${header()}${page}${footer()}`;
  renderShopProducts();
}

function announce(message) {
  state.feedback = message;
  const feedback = document.querySelector(".site-feedback");
  if (feedback) feedback.textContent = message;
}

function addToCart(productId) {
  const product = PRODUCTS.find((entry) => entry.id === productId);
  if (!product || !product.available) {
    announce("This demonstration item is not currently available.");
    return;
  }
  if (!state.selectedSize || !state.selectedColor) {
    announce("Choose a size and colour before adding this item.");
    return;
  }

  const existing = state.cart.find(
    (item) =>
      item.productId === productId &&
      item.size === state.selectedSize &&
      item.color === state.selectedColor
  );

  if (existing) existing.quantity += 1;
  else {
    state.cart.push({
      productId,
      size: state.selectedSize,
      color: state.selectedColor,
      quantity: 1
    });
  }

  const saved = saveCart();
  state.feedback = saved
    ? `${product.name} added to your demo bag.`
    : `${product.name} added for this session, but the browser could not save your demo bag.`;
  render();
}

function changeCartItem(button, change) {
  const itemIndex = state.cart.findIndex(
    (entry) =>
      entry.productId === button.dataset.productId &&
      entry.size === button.dataset.size &&
      entry.color === button.dataset.color
  );
  if (itemIndex === -1) return;

  if (change === "remove") state.cart.splice(itemIndex, 1);
  else {
    state.cart[itemIndex].quantity += change;
    if (state.cart[itemIndex].quantity <= 0) state.cart.splice(itemIndex, 1);
  }

  saveCart();
  render();
}

window.addEventListener("hashchange", () => {
  state.feedback = "";
  render();
  window.scrollTo(0, 0);
});

document.addEventListener("click", (event) => {
  const skipLink = event.target.closest(".skip-link");
  if (skipLink) {
    event.preventDefault();
    const mainContent = document.querySelector("#main-content");
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
    }
    return;
  }

  const button = event.target.closest("[data-action]");
  if (button) {
    if (button.dataset.action === "add-to-cart") addToCart(button.dataset.productId);
    if (button.dataset.action === "increase") changeCartItem(button, 1);
    if (button.dataset.action === "decrease") changeCartItem(button, -1);
    if (button.dataset.action === "remove") changeCartItem(button, "remove");
    return;
  }

  const menuToggle = event.target.closest(".menu-toggle");
  if (menuToggle) {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    document.querySelector(".primary-nav").classList.toggle("is-open", !isExpanded);
    return;
  }

  if (event.target.closest(".primary-nav a")) {
    document.querySelector(".primary-nav").classList.remove("is-open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "product-size") state.selectedSize = event.target.value;
  if (event.target.id === "product-color") state.selectedColor = event.target.value;
  if (event.target.id === "category-filter") {
    state.category = event.target.value;
    renderShopProducts();
  }
  if (event.target.id === "sort-products") {
    state.sort = event.target.value;
    renderShopProducts();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "product-search") {
    state.search = event.target.value;
    renderShopProducts();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.matches(".contact-form")) {
    event.preventDefault();
    const feedback = event.target.querySelector(".contact-feedback");
    feedback.textContent = "Demo only — your message passed validation but was not sent or stored.";
    event.target.reset();
  }

  if (event.target.matches(".newsletter-form")) {
    event.preventDefault();
    const feedback = event.target.parentElement.querySelector(".newsletter-feedback");
    feedback.textContent = "Thanks for your interest. This demo does not save or send email addresses.";
    event.target.reset();
  }
});

render();
