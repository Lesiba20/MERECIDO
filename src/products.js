import { IMAGES } from "./images.js";

// Demonstration catalogue. Product photography URLs are centralized in images.js.
export const PRODUCTS = [
  {
    id: "everyday-hoodie",
    name: "Everyday Hoodie",
    category: "Hoodies",
    price: 1499,
    image: IMAGES.products.afterHoursHoodie,
    alt: "Dark relaxed-fit hoodie shown in a fashion photograph",
    description:
      "A relaxed-fit layer for slow mornings and long days. Finished with a considered, minimal look.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Obsidian", "Burgundy"],
    available: true
  },
  {
    id: "everyday-tee",
    name: "Everyday Tee",
    category: "Tees",
    price: 699,
    image: IMAGES.products.offScriptTee,
    alt: "Off-white cotton T-shirt shown in a fashion photograph",
    description:
      "An easy, relaxed tee with a clean profile and a soft, substantial feel. Designed to wear your way.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Off-white", "Obsidian"],
    available: true
  },
  {
    id: "daily-cap",
    name: "Daily Cap",
    category: "Caps",
    price: 499,
    image: IMAGES.products.districtCap,
    alt: "Black six-panel cap shown in a product photograph",
    description:
      "A structured six-panel cap with an adjustable back and a clean, low-key finish.",
    sizes: ["One size"],
    colors: ["Obsidian", "Concrete"],
    available: true
  },
  {
    id: "city-runner",
    name: "City Runner",
    category: "Footwear",
    price: 1899,
    image: IMAGES.products.concreteRunner,
    alt: "Red and white sneaker shown in a product photograph",
    description:
      "An everyday sneaker with a cushioned sole and a confident, easy-to-style colour combination.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Burgundy / Off-white", "Obsidian"],
    available: true
  },
  {
    id: "soft-touch-hoodie",
    name: "Soft Touch Hoodie",
    category: "Hoodies",
    price: 1599,
    image: IMAGES.products.noApologiesHoodie,
    alt: "Neutral-colour hooded sweatshirt shown in a fashion photograph",
    description:
      "Roomy proportions and a soft brushed interior make this an easy layer for your daily rotation.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Burgundy", "Obsidian"],
    available: true
  },
  {
    id: "weekend-tee",
    name: "Weekend Tee",
    category: "Tees",
    price: 749,
    image: IMAGES.products.cityFrequencyTee,
    alt: "Relaxed-fit graphic T-shirt shown in a fashion photograph",
    description:
      "A relaxed-fit graphic tee with an easy silhouette and a little extra personality.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Off-white", "Deep blue"],
    available: true
  },
  {
    id: "off-duty-cap",
    name: "Off-Duty Cap",
    category: "Caps",
    price: 549,
    image: IMAGES.products.offGridCap,
    alt: "Dark baseball cap shown in a product photograph",
    description:
      "A clean everyday essential with a curved brim and an adjustable fit.",
    sizes: ["One size"],
    colors: ["Deep blue", "Obsidian"],
    available: true
  },
  {
    id: "after-hours-sneaker",
    name: "After Hours Sneaker",
    category: "Footwear",
    price: 1999,
    image: IMAGES.products.nightShiftSneaker,
    alt: "Dark low-top sneaker shown in a product photograph",
    description:
      "A streamlined low-top with a confident silhouette and comfortable feel for everyday movement.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Obsidian", "Concrete"],
    available: false
  }
];

export const CATEGORIES = ["Hoodies", "Tees", "Caps", "Footwear"];
