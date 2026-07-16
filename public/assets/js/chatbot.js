/* AAEJEY AI Chatbot widget — fully local, no backend required */
(function () {
  "use strict";

  var SUGGESTIONS = [
    "What products do you make?",
    "Do you export internationally?",
    "How can I become a distributor?",
    "Where are you based?",
  ];

  var WELCOME =
    "Hi! I'm Aae, AAEJEY's virtual assistant. Ask me about our products, brands, exports, or how to get in touch. 👋";

  // ---------- Local knowledge base ----------
  var BRANDS = {
    nilma: {
      name: "Nilma — Liquid Blue",
      reply:
        "**Nilma** is our laundry whitener/blueing agent that keeps whites bright and fresh. Available in 30ml and 275ml bottles. See the Liquid Blue product page for details."
    },
    flowery: {
      name: "Flowery — Air Freshener",
      reply:
        "**Flowery** is our long-lasting air freshener in a 50g plastic holder — a subtle, pleasant fragrance for homes, offices and vehicles."
    },
    mammoth: {
      name: "Mammoth — Naphthalene Balls",
      reply:
        "**Mammoth** naphthalene balls protect clothes and cupboards from moths and mildew. Sold in 400g packs."
    },
    rytink: {
      name: "Rytink — Ball Point Pens",
      reply:
        "**Rytink** (Rytink Alpha range) is our smooth-writing ball point pen line, made for schools, offices and everyday use."
    },
    luty: {
      name: "Luty — Liquid Dish Wash",
      reply:
        "**Luty** is our concentrated liquid dish wash — cuts grease fast and is gentle on hands. Available in 500ml bottles."
    },
    lovendry: {
      name: "Lovendry — Laundry Detergent",
      reply:
        "**Lovendry** is our liquid laundry detergent, formulated for bright colours and fresh whites. Sold in 1000ml bottles."
    },
    "mr. doust": {
      name: "Mr. Doust — Toilet Cleaner",
      reply:
        "**Mr. Doust** is our powerful toilet cleaner that removes tough stains and kills germs. Available in 500ml bottles."
    },
    "mr doust": {
      name: "Mr. Doust — Toilet Cleaner",
      reply:
        "**Mr. Doust** is our powerful toilet cleaner that removes tough stains and kills germs. Available in 500ml bottles."
    },
    doust: {
      name: "Mr. Doust — Toilet Cleaner",
      reply:
        "**Mr. Doust** is our powerful toilet cleaner that removes tough stains and kills germs. Available in 500ml bottles."
    },
    sixer: {
      name: "Sixer — Cricket Tennis Balls",
      reply:
        "**Sixer** cricket tennis balls are made for street cricket and casual play — durable, bouncy, and built to last."
    },
  };

  var PRODUCTS_LIST =
    "Here's what we make at AAEJEY:\n\n" +
    "• **Liquid Blue (Nilma)** — laundry whitener, 30ml & 275ml\n" +
    "• **Air Freshener (Flowery)** — 50g plastic holder\n" +
    "• **Naphthalene Balls (Mammoth)** — 400g packs\n" +
    "• **Liquid Dish Wash (Luty)** — 500ml bottles\n" +
    "• **Laundry Detergent (Lovendry)** — 1000ml bottles\n" +
    "• **Toilet Cleaner (Mr. Doust)** — 500ml bottles\n" +
    "• **Cricket Tennis Balls (Sixer)** — sports\n" +
    "• **Ball Point Pens (Rytink)** — Alpha range\n\n" +
    "Ask me about any brand for more details!";

  var EXPORT_REPLY =
    "We welcome international buyers! 🌍 AAEJEY exports across the **Middle East** and to distributors worldwide. For MOQ, pricing, and shipping details, please email **info@aaejey.com** or WhatsApp **+94 72 228 0809**. You can also visit our Export page for full information.";

  var CONTACT_REPLY =
    "You can reach us at:\n\n" +
    "📍 **Location:** Sri Lanka\n" +
    "📧 **Email:** info@aaejey.com\n" +
    "📱 **WhatsApp / Phone:** +94 72 228 0809\n" +
    "🕐 **Hours:** Mon – Sat, 9:00 – 17:00 IST\n\n" +
    "Or use the contact form on our Contact page and we'll reply within 1–2 business days.";

  var GREETING_REPLY =
    "Hello! 👋 Welcome to AAEJEY Consumer Company. I'm Aae, here to help you learn about our brands, products, exports, or how to reach us. What would you like to know?";

  var THANKS_REPLY =
    "You're very welcome! 😊 Is there anything else I can help you with?";

  var ABOUT_REPLY =
    "**AAEJEY Consumer Company** is a family-run FMCG manufacturer based in Sri Lanka with 25+ years of experience. We produce 8 trusted household brands — all made in-house — and export to distributors internationally.";

  var PRICE_REPLY =
    "For pricing, MOQ, and wholesale enquiries, please email **info@aaejey.com** or WhatsApp **+94 72 228 0809**. Our team will get back to you within 1–2 business days with a full quote.";

  // ---------- Private / insider info (not on the public site) ----------
  var PRIVATE_INFO = [
    {
      keys: ["secret recipe", "recipe", "ingredient", "ingredients", "formula", "what's inside", "whats inside", "made of", "made from"],
      reply:
        "Great question! 🌿 Our **secret recipe** relies on **high-grade local ingredients sourced right here in Sri Lanka** — we take pride in supporting local suppliers while keeping quality consistent across every batch."
    },
    {
      keys: ["wholesale pric", "wholesale rate", "bulk pric", "bulk rate", "bulk order pric", "wholesale cost", "trade price", "dealer price"],
      reply:
        "For **wholesale pricing** and bulk rates, please contact our sales team directly — they'll tailor a quote to your order volume and destination. 📧 **info@aaejey.com** · 📱 **+94 72 228 0809**"
    },
    {
      keys: ["founder", "who founded", "who started", "started by", "owner", "who owns", "family behind"],
      reply:
        "AAEJEY was **founded by the AAEJEY family over 25 years ago** — and it's still proudly family-run today. Three generations of hands-on care go into every product we make."
    }
  ];

  var FALLBACK =
    "I'm not quite sure I caught that. Here's what I can help with:\n\n" +
    "• Our **products** and brands\n" +
    "• **Export** and distribution enquiries\n" +
    "• **Contact** details and location\n" +
    "• Info about a specific brand (Nilma, Flowery, Mammoth, Luty, Lovendry, Mr. Doust, Rytink, Sixer)\n\n" +
    "For anything else, please email **info@aaejey.com** or WhatsApp **+94 72 228 0809**.";

  function has(text, words) {
    for (var i = 0; i < words.length; i++) {
      if (text.indexOf(words[i]) !== -1) return true;
    }
    return false;
  }

  function answer(raw) {
    var text = " " + raw.toLowerCase().trim() + " ";

    // Greetings
    if (has(text, [" hi ", " hii ", " hey ", " hello ", " helo ", " hola ", " good morning", " good afternoon", " good evening", " greetings"])) {
      return GREETING_REPLY;
    }

    // Thanks
    if (has(text, ["thank", "thanks", "thx", "appreciate"])) {
      return THANKS_REPLY;
    }

    // Specific brands — check first so "nilma products" hits brand, not list
    var brandKeys = Object.keys(BRANDS);
    for (var i = 0; i < brandKeys.length; i++) {
      if (text.indexOf(brandKeys[i]) !== -1) {
        return BRANDS[brandKeys[i]].reply;
      }
    }

    // Private / insider info (checked before generic fallbacks)
    for (var p = 0; p < PRIVATE_INFO.length; p++) {
      if (has(text, PRIVATE_INFO[p].keys)) return PRIVATE_INFO[p].reply;
    }

    // Product categories keyword match (individual product)
    if (has(text, ["liquid blue", "blueing", "whitener", "laundry blue"])) return BRANDS.nilma.reply;
    if (has(text, ["air freshener", "air fresh", "fragrance", "freshener"])) return BRANDS.flowery.reply;
    if (has(text, ["naphthalene", "moth ball", "mothball", "moth repellent"])) return BRANDS.mammoth.reply;
    if (has(text, ["dish wash", "dishwash", "dish soap", "dishes"])) return BRANDS.luty.reply;
    if (has(text, ["detergent", "laundry soap", "washing liquid"])) return BRANDS.lovendry.reply;
    if (has(text, ["toilet clean", "bathroom clean", "toilet"])) return BRANDS["mr. doust"].reply;
    if (has(text, ["cricket", "tennis ball", "sports ball", " ball "])) return BRANDS.sixer.reply;
    if (has(text, ["pen", "ballpoint", "ball point", "stationery"])) return BRANDS.rytink.reply;

    // Products list
    if (has(text, ["product", "what do you make", "what do you sell", "what you make", "catalog", "catalogue", "range", "items", "what are your"])) {
      return PRODUCTS_LIST;
    }

    // Export / distributor / international
    if (has(text, ["export", "distributor", "distribut", "international", "overseas", "middle east", "wholesale", "bulk", "abroad", "ship worldwide", "global"])) {
      return EXPORT_REPLY;
    }

    // Contact / location / email
    if (has(text, ["contact", "email", "phone", "call", "whatsapp", "reach", "location", "address", "where are you", "based", "office", "factory", "sri lanka", "hours", "open"])) {
      return CONTACT_REPLY;
    }

    // Pricing
    if (has(text, ["price", "cost", "quote", "moq", "minimum order", "how much"])) {
      return PRICE_REPLY;
    }

    // About
    if (has(text, ["about", "who are you", "who is aaejey", "company", "history", "background", "aaejey"])) {
      return ABOUT_REPLY;
    }

    // Yes / no small talk
    if (/^\s*(yes|yeah|yep|sure|ok|okay)\s*$/.test(raw.toLowerCase())) {
      return "Great! What would you like to know — our products, exports, or contact info?";
    }
    if (/^\s*(no|nope|nah)\s*$/.test(raw.toLowerCase())) {
      return "No problem! Feel free to ask anytime. 👋";
    }

    // Bye
    if (has(text, ["bye", "goodbye", "see you", "cya"])) {
      return "Goodbye! Thanks for visiting AAEJEY. Have a great day! 👋";
    }

    // No match — caller should try the general LLM fallback
    return null;
  }

  // ---------- General AI fallback ----------
  // For questions outside AAEJEY's business scope, call a lightweight LLM
  // via our own /api/public/chat endpoint (Lovable AI Gateway). The reply
  // is prefixed with a polite reminder that this is the AAEJEY assistant.
  function generalFallback(userText) {
    var payload = {
      messages: [
        {
          role: "system",
          content:
            "You are Aae, the AAEJEY Consumer Company assistant. The user just asked something outside AAEJEY's business scope (not about our products, brands, exports, or contact info). Answer their general question helpfully and concisely (2-4 sentences). Do NOT invent AAEJEY-specific facts. Reply ONLY with the general answer text — no preamble, no reminder about AAEJEY (that will be added automatically)."
        },
        { role: "user", content: userText }
      ]
    };
    return fetch("/api/public/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        var ans = data && data.reply ? String(data.reply).trim() : "";
        if (!ans) return FALLBACK;
        return "I'm the AAEJEY assistant, but I can help you with that! " + ans +
          "\n\nIs there anything about our **products, exports, or contact info** I can help with?";
      })
      .catch(function () { return FALLBACK; });
  }

  // ---------- UI ----------
  var fab = document.createElement("button");
  fab.className = "chat-fab";
  fab.setAttribute("aria-label", "Open chat");
  fab.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
    '<span class="chat-fab-badge">AI</span>';

  var panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "AAEJEY assistant");
  panel.innerHTML =
    '<div class="chat-header">' +
      '<div class="chat-avatar">Ae</div>' +
      '<div class="chat-title">' +
        '<div class="chat-title-name">Aae · AAEJEY Assistant</div>' +
        '<div class="chat-title-sub">Online · usually replies instantly</div>' +
      '</div>' +
      '<button class="chat-close" aria-label="Close">×</button>' +
    '</div>' +
    '<div class="chat-body" id="chat-body"></div>' +
    '<div class="chat-input-row">' +
      '<input type="text" class="chat-input" id="chat-input" placeholder="Type your question…" maxlength="1000" autocomplete="off" />' +
      '<button class="chat-send" id="chat-send" aria-label="Send">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="chat-footer-note">For urgent matters call +94 72 228 0809</div>';

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var body = panel.querySelector("#chat-body");
  var input = panel.querySelector("#chat-input");
  var sendBtn = panel.querySelector("#chat-send");
  var closeBtn = panel.querySelector(".chat-close");

  var opened = false;

  function scrollBottom() { body.scrollTop = body.scrollHeight; }

  // Very small markdown → HTML (bold + line breaks + bullets)
  function renderMd(text) {
    var esc = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    esc = esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    esc = esc.replace(/\n/g, "<br>");
    return esc;
  }

  function addMessage(role, text) {
    var wrap = document.createElement("div");
    wrap.className = "chat-msg " + role;
    var bubble = document.createElement("div");
    bubble.className = "chat-msg-bubble";
    if (role === "assistant") {
      bubble.innerHTML = renderMd(text);
    } else {
      bubble.textContent = text;
    }
    wrap.appendChild(bubble);
    body.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function addTyping() {
    var wrap = document.createElement("div");
    wrap.className = "chat-msg assistant";
    wrap.innerHTML =
      '<div class="chat-typing"><span></span><span></span><span></span></div>';
    body.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function addSuggestions() {
    var wrap = document.createElement("div");
    wrap.className = "chat-suggestions";
    SUGGESTIONS.forEach(function (s) {
      var chip = document.createElement("button");
      chip.className = "chat-chip";
      chip.textContent = s;
      chip.addEventListener("click", function () {
        wrap.remove();
        send(s);
      });
      wrap.appendChild(chip);
    });
    body.appendChild(wrap);
    scrollBottom();
  }

  function openPanel() {
    panel.classList.add("open");
    fab.style.display = "none";
    if (!opened) {
      opened = true;
      addMessage("assistant", WELCOME);
      addSuggestions();
    }
    setTimeout(function () { input.focus(); }, 100);
  }

  function closePanel() {
    panel.classList.remove("open");
    fab.style.display = "flex";
  }

  fab.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);

  function send(text) {
    text = (text || input.value || "").trim();
    if (!text) return;
    input.value = "";
    addMessage("user", text);
    var typing = addTyping();
    // Small delay to feel natural
    setTimeout(function () {
      typing.remove();
      addMessage("assistant", answer(text));
      input.focus();
    }, 450 + Math.random() * 350);
  }

  sendBtn.addEventListener("click", function () { send(); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
})();
