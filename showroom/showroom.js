/**

 * Showroom – produktmodal med färgvarianter och klick-zoom

 */

const PRODUCTS = {

  "typ1-malaysian": {

    title: "Typ 1: Abaya malaysian",

    description: "Abaya Malaysia med över- och underdel",

    size: "54–58 (preliminärt)",

    price: "600 kr (preliminärt)",

    variants: [

      { src: "./images/abaya_brun.jpg", color: "Brun" },

      { src: "./images/abaya_green.jpg", color: "Grön" },

      { src: "./images/abaya_purple.jpg", color: "Lila" },

      { src: "./images/abaya_gulgrön.jpg", color: "Gulgrön" },

      { src: "./images/abaya_dark_blue__green.jpg", color: "Mörkblå/grön" },

    ],

  },

  "typ2-lovdekor": {

    title: "Typ 2: Abaya lövdekor",

    description: "Abaya öppen, lövdekoration",

    size: "54–58 (preliminärt)",

    price: "600 kr (preliminärt)",

    variants: [

      { src: "./images/abaya_beige_dekor.jpg", color: "Beige" },

      { src: "./images/abaya_beige_dekor_2.jpg", color: "Beige (variant 2)" },

      { src: "./images/abaya_brun_dekor.jpg", color: "Brun" },

      { src: "./images/abaya_brun_dekor_3.jpg", color: "Brun (variant 3)" },

      { src: "./images/abaya_dark_red_dekor.jpg", color: "Mörkröd" },

      { src: "./images/abaya_dark_red_dekor_2.jpg", color: "Mörkröd (variant 2)" },

      { src: "./images/abaya_green_dekor.jpg", color: "Grön" },

      { src: "./images/abaya_mint_dekor.jpg", color: "Mint" },

      { src: "./images/abaya_purple_dekor.jpg", color: "Lila" },

      { src: "./images/abaya_purple_dekor_2.jpg", color: "Lila (variant 2)" },

    ],

  },

  "typ3-blomsterdekor": {

    title: "Typ 3: Abaya blomsterdekor",

    description: "Abaya blomsterdekor",

    size: "54–58 (preliminärt)",

    price: "600 kr (preliminärt)",

    variants: [

      { src: "./images/abaya_green_blomst_dekor.jpg", color: "Grön" },

      { src: "./images/abaya_dark_blue_blomst_dekor.jpg", color: "Mörkblå" },

      { src: "./images/abaya_dark_gray_blomst_dekor.jpg", color: "Mörkgrå" },

      { src: "./images/abaya_dark_red_blomst_dekor.jpg", color: "Mörkröd" },

    ],

  },

  "typ4-gulddekor": {

    title: "Typ 4: Abaya gulddekor",

    description: "Abaya gulddekor",

    size: "54–58 (preliminärt)",

    price: "600 kr (preliminärt)",

    variants: [{ src: "./images/abaya_dark_blue_gold_dekor.jpg", color: "Mörkblå" }],

  },

  "typ5-monster-bla": {

    title: "Typ 5: Abaya mönsterdekor",

    description: "Abaya mönstrad",

    size: "54–58 (preliminärt)",

    price: "600 kr (preliminärt)",

    variants: [

      { src: "./images/abaya_white_blueish_pattern_dekor.jpg", color: "Vit, blåaktigt mönster" },
      { src: "./images/abaya_white_green_pattern_dekor.jpg", color: "Vit, grönt mönster" },

    ],

  },

  "typ6-tonad": {

    title: "Typ 6: Abaya tonad",

    description: "Abaya tonad med blomsterdekor",

    size: "54–58 (preliminärt)",

    price: "600 kr (preliminärt)",

    variants: [

      { src: "./images/abaya_pink_dekor.jpg", color: "Rosa" },

      { src: "./images/abaya_light_green_dekor.jpg", color: "Ljusgrön" },

    ],

  },

  "typ7-digital": {

    title: 'Typ 7: Abaya "digital"',

    description: 'Abaya "digital" blomsterdekoration',

    size: "54–58 (preliminärt)",

    price: "600 kr (preliminärt)",

    variants: [

      { src: "./images/abaya_yellow_blomst_dekor.jpg", color: "Gul" },

      { src: "./images/abaya_mint_blomst_dekor.jpg", color: "Mintgrön" },

    ],

  },

  "typ8-extra-bred": {

    title: "Typ 8: Abaya extra bred",

    description: "Abaya stängd med extra bred",

    size: "54–58 (preliminärt)",

    price: "500 kr (preliminärt)",

    variants: [

      { src: "./images/abaya_dark_blue_3.jpg", color: "Mörkblå" },

      { src: "./images/abaya_dark_blue__green.jpg", color: "Mörkblå/grön" },

    ],

  },

};



/** Startzoom när förstoringsrutan öppnas (~50 % inzoomat) */

const INITIAL_ZOOM = 1.5;



const modal = document.getElementById("variant-modal");

const modalImg = document.getElementById("variant-modal-img");

const modalTitle = document.getElementById("variant-modal-title");

const modalDesc = document.getElementById("variant-modal-desc");

const modalSize = document.getElementById("variant-modal-size");

const modalPrice = document.getElementById("variant-modal-price");

const modalColor = document.getElementById("variant-modal-color");

const swatchesEl = document.getElementById("variant-swatches");

const closeBtn = modal?.querySelector(".variant-modal__close");

const backdrop = modal?.querySelector(".variant-modal__backdrop");

const modalStage = document.getElementById("variant-modal-stage");



const zoomEl = document.getElementById("zoom-viewer");

const zoomImg = document.getElementById("zoom-viewer-img");

const zoomTitle = document.getElementById("zoom-viewer-title");

const zoomViewport = document.getElementById("zoom-viewport");

const zoomClose = zoomEl?.querySelector(".zoom-viewer__close");

const zoomBackdrop = zoomEl?.querySelector("[data-zoom-close]");



let activeProductId = null;

let activeVariantIndex = 0;

let lastFocus = null;



let zoomScale = INITIAL_ZOOM;

let zoomPanX = 0;

let zoomPanY = 0;

let isPanning = false;

let panStartX = 0;

let panStartY = 0;

let panOriginX = 0;

let panOriginY = 0;



function openModal(productId) {

  const product = PRODUCTS[productId];

  if (!product || !modal) return;



  activeProductId = productId;

  lastFocus = document.activeElement;



  modalTitle.textContent = product.title;

  modalDesc.textContent = product.description;

  modalSize.textContent = product.size;

  modalPrice.textContent = product.price;



  swatchesEl.innerHTML = "";

  product.variants.forEach((variant, index) => {

    const btn = document.createElement("button");

    btn.type = "button";

    btn.className = "variant-swatch";

    btn.dataset.index = String(index);

    btn.setAttribute("aria-label", `Visa ${variant.color}`);

    btn.setAttribute("aria-pressed", index === 0 ? "true" : "false");



    const thumb = document.createElement("img");

    thumb.src = variant.src;

    thumb.alt = "";

    thumb.loading = "lazy";

    thumb.width = 72;

    thumb.height = 96;



    const label = document.createElement("span");

    label.className = "variant-swatch__label";

    label.textContent = variant.color;



    btn.append(thumb, label);

    btn.addEventListener("click", (e) => {

      e.stopPropagation();

      selectVariant(productId, index);

    });

    swatchesEl.append(btn);

  });



  selectVariant(productId, 0);



  modal.hidden = false;

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  closeBtn?.focus();

}



function selectVariant(productId, index) {

  const product = PRODUCTS[productId];

  const variant = product?.variants[index];

  if (!variant) return;



  activeVariantIndex = index;

  modalImg.src = variant.src;

  modalImg.alt = `${product.title} – ${variant.color}`;

  modalColor.textContent = variant.color;



  swatchesEl.querySelectorAll(".variant-swatch").forEach((btn, i) => {

    btn.classList.toggle("variant-swatch--active", i === index);

    btn.setAttribute("aria-pressed", i === index ? "true" : "false");

  });



  if (zoomEl && !zoomEl.hidden) {

    zoomTitle.textContent = `${product.title} · ${variant.color}`;

    zoomImg.src = variant.src;

    zoomImg.alt = `${product.title} – ${variant.color}`;

    resetZoomView();

  }

}



function applyZoomTransform() {

  if (!zoomImg) return;

  zoomImg.style.transform = `translate(${zoomPanX}px, ${zoomPanY}px) scale(${zoomScale})`;

}



function resetZoomView() {

  zoomScale = INITIAL_ZOOM;

  zoomPanX = 0;

  zoomPanY = 0;

  applyZoomTransform();

}



function clampPan() {

  if (!zoomViewport || !zoomImg) return;



  const vw = zoomViewport.clientWidth;

  const vh = zoomViewport.clientHeight;

  const rect = zoomImg.getBoundingClientRect();

  const scaledW = rect.width;

  const scaledH = rect.height;

  const maxX = Math.max(0, (scaledW - vw) / 2);

  const maxY = Math.max(0, (scaledH - vh) / 2);



  zoomPanX = Math.min(maxX, Math.max(-maxX, zoomPanX));

  zoomPanY = Math.min(maxY, Math.max(-maxY, zoomPanY));

}



function openZoom(productId, index) {

  const product = PRODUCTS[productId];

  const variant = product?.variants[index];

  if (!product || !variant || !zoomEl) return;



  zoomTitle.textContent = `${product.title} · ${variant.color}`;

  zoomImg.src = variant.src;

  zoomImg.alt = `${product.title} – ${variant.color}`;



  zoomEl.hidden = false;

  zoomEl.setAttribute("aria-hidden", "false");

  document.body.classList.add("zoom-open");



  const showZoomed = () => {
    resetZoomView();
    requestAnimationFrame(() => {
      clampPan();
      applyZoomTransform();
    });
  };



  if (zoomImg.complete) {

    showZoomed();

  } else {

    zoomImg.addEventListener("load", showZoomed, { once: true });

  }



  zoomClose?.focus();

}



function closeZoom() {

  if (!zoomEl || zoomEl.hidden) return;

  zoomEl.hidden = true;

  zoomEl.setAttribute("aria-hidden", "true");

  document.body.classList.remove("zoom-open");

  resetZoomView();

  modalStage?.focus();

}



function openZoomForActiveVariant() {

  if (!activeProductId) return;

  openZoom(activeProductId, activeVariantIndex);

}



function closeModal() {

  closeZoom();

  if (!modal) return;

  modal.hidden = true;

  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  activeProductId = null;

  lastFocus?.focus();

}



function initCards() {

  document.querySelectorAll(".card[data-product-id]").forEach((card) => {

    const id = card.dataset.productId;

    const product = PRODUCTS[id];

    if (!product) return;



    const count = product.variants.length;

    const hint = card.querySelector(".card-hint");

    if (hint) {

      hint.textContent =

        count === 1 ? "Visa produkt" : `Visa ${count} färgvarianter`;

    }



    card.addEventListener("click", () => openModal(id));



    card.addEventListener("keydown", (e) => {

      if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        openModal(id);

      }

    });

  });

}



closeBtn?.addEventListener("click", closeModal);

backdrop?.addEventListener("click", closeModal);

modalStage?.addEventListener("click", openZoomForActiveVariant);



zoomClose?.addEventListener("click", closeZoom);

zoomBackdrop?.addEventListener("click", closeZoom);



if (zoomViewport && zoomImg) {

  zoomViewport.addEventListener("pointerdown", (e) => {

    if (e.target.closest("button")) return;

    isPanning = true;

    panStartX = e.clientX;

    panStartY = e.clientY;

    panOriginX = zoomPanX;

    panOriginY = zoomPanY;

    zoomViewport.setPointerCapture(e.pointerId);

  });



  zoomViewport.addEventListener("pointermove", (e) => {

    if (!isPanning) return;

    zoomPanX = panOriginX + (e.clientX - panStartX);

    zoomPanY = panOriginY + (e.clientY - panStartY);

    clampPan();

    applyZoomTransform();

  });



  zoomViewport.addEventListener("pointerup", () => {

    isPanning = false;

  });



  zoomViewport.addEventListener("pointercancel", () => {

    isPanning = false;

  });

}



document.addEventListener("keydown", (e) => {

  if (e.key !== "Escape") return;

  if (zoomEl && !zoomEl.hidden) {

    closeZoom();

    return;

  }

  if (modal && !modal.hidden) closeModal();

});



if (modal && swatchesEl && zoomEl) {

  initCards();

}


