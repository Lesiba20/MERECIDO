import { IMAGES } from "./images.js";

// Demonstration catalogue. Product photography URLs are centralized in images.js.
export const PRODUCTS = [
  {
    id: "after-hours-hoodie",
    name: "After Hours Hoodie",
    category: "Hoodies",
    price: 1499,
    image: IMAGES.products.afterHoursHoodie,
    alt: "Model wearing a dark oversized hoodie",
    description:
      "A heavyweight, relaxed-fit layer made for late nights and long days. Finished with a considered, minimal graphic.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Obsidian", "Burgundy"],
    available: true
  },
  {
    id: "off-script-tee",
    name: "Off Script Tee",
    category: "Tees",
    price: 699,
    image: IMAGES.products.offScriptTee,
    alt: "Off-white oversized cotton T-shirt",
    description:
      "An everyday oversized tee with a clean profile and an easy, substantial feel. Designed to wear your way.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Off-white", "Obsidian"],
    available: true
  },
  {
    id: "district-cap",
    name: "District Cap",
    category: "Caps",
    price: 499,
    image: IMAGES.products.districtCap,
    alt: "Black six-panel streetwear cap",
    description:
      "A structured six-panel cap with an adjustable back and a low-key VVS DELUXE mark.",
    sizes: ["One size"],
    colors: ["Obsidian", "Concrete"],
    available: true
  },
  {
    id: "concrete-runner",
    name: "Concrete Runner",
    category: "Footwear",
    price: 1899,
    image: IMAGES.products.concreteRunner,
    alt: "Red and white streetwear sneaker",
    description:
      "A statement everyday sneaker with a cushioned sole and a colour story inspired by the city after dark.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Burgundy / Off-white", "Obsidian"],
    available: true
  },
  {
    id: "no-apologies-hoodie",
    name: "No Apologies Hoodie",
    category: "Hoodies",
    price: 1599,
    image: IMAGES.products.noApologiesHoodie,
    alt: "Premium neutral-colour hooded sweatshirt",
    description:
      "Roomy proportions, a soft brushed interior and a bold attitude. A versatile statement piece for daily rotation.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Burgundy", "Obsidian"],
    available: true
  },
  {
    id: "city-frequency-tee",
    name: "City Frequency Tee",
    category: "Tees",
    price: 749,
    image: IMAGES.products.cityFrequencyTee,
    alt: "Model in a relaxed-fit graphic T-shirt",
    description:
      "A relaxed-fit graphic tee inspired by the pulse and layered sounds of Gauteng.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Off-white", "Deep blue"],
    available: true
  },
  {
    id: "off-grid-cap",
    name: "Off Grid Cap",
    category: "Caps",
    price: 549,
    image: IMAGES.products.offGridCap,
    alt: "Minimal dark baseball cap",
    description:
      "A clean, everyday essential with a curved brim and adjustable fit. Quiet detail, unmistakable energy.",
    sizes: ["One size"],
    colors: ["Deep blue", "Obsidian"],
    available: true
  },
  {
    id: "night-shift-sneaker",
    name: "Night Shift Sneaker",
    category: "Footwear",
    price: 1999,
    image: IMAGES.products.nightShiftSneaker,
    alt: "Dark low-top sneaker photographed on a city surface",
    description:
      "A streamlined low-top made for everyday movement, with a confident silhouette and all-day comfort.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Obsidian", "Concrete"],
    available: false
  }
];

export const CATEGORIES = ["Hoodies", "Tees", "Caps", "Footwear"];
