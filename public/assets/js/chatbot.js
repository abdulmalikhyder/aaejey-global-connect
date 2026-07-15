/* AAEJEY AI Chatbot widget — vanilla JS */
(function () {
  "use strict";

  // API endpoint — points to the Lovable-hosted backend so the chatbot works
  // even when the static site is deployed elsewhere (Netlify, Vercel, etc.).
  var API_ENDPOINT =
    "https://project--7e5e965d-325e-4d0a-be65-f7aa7a4ff7ef.lovable.app/api/public/chat";

  // On the Lovable preview / same-origin, use relative path.
  if (
    location.hostname.indexOf("lovable.app") !== -1 ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
  ) {
    API_ENDPOINT = "/api/public/chat";
  }

  var SUGGESTIONS = [
    "What products do you make?",
    "Do you export internationally?",
    "How can I become a distributor?",
    "Where are you based?",
  ];

  var WELCOME =
    "Hi! I'm Aae, AAEJEY's virtual assistant. Ask me about our products, brands, exports, or how to get in touch. 👋";

  // Build DOM
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
    '<div class="chat-footer-note">Powered by AI · For urgent matters call +94 72 228 0809</div>';

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var body = panel.querySelector("#chat-body");
  var input = panel.querySelector("#chat-input");
  var sendBtn = panel.querySelector("#chat-send");
  var closeBtn = panel.querySelector(".chat-close");

  var history = []; // [{role, content}]
  var busy = false;
  var opened = false;

  function scrollBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function addMessage(role, text) {
    var wrap = document.createElement("div");
    wrap.className = "chat-msg " + role;
    var bubble = document.createElement("div");
    bubble.className = "chat-msg-bubble";
    bubble.textContent = text;
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
    if (!text || busy) return;
    input.value = "";
    addMessage("user", text);
    history.push({ role: "user", content: text });
    var typing = addTyping();
    busy = true;
    sendBtn.disabled = true;

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        typing.remove();
        if (result.ok && result.data.reply) {
          addMessage("assistant", result.data.reply);
          history.push({ role: "assistant", content: result.data.reply });
        } else {
          var err = (result.data && result.data.error) ||
            "Sorry, I couldn't reach the assistant. Please try again or email info@aaejey.com.";
          addMessage("error", err);
        }
      })
      .catch(function () {
        typing.remove();
        addMessage(
          "error",
          "Network error. Please check your connection or email info@aaejey.com."
        );
      })
      .then(function () {
        busy = false;
        sendBtn.disabled = false;
        input.focus();
      });
  }

  sendBtn.addEventListener("click", function () { send(); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
})();
