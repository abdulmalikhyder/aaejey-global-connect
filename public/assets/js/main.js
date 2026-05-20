/* AAEJEY — shared site JS. No frameworks. */
(function () {
  "use strict";

  // ---- Mobile menu ----
  const burger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") navLinks.classList.remove("open");
    });
  }

  // ---- Mark active nav link ----
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (
      href === here ||
      (here === "" && href === "index.html") ||
      (href !== "index.html" && here.startsWith(href.replace(".html", "")))
    ) {
      a.classList.add("active");
    }
  });

  // ---- Reveal on scroll ----
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }

  // ---- Stats counter ----
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const suffix = el.getAttribute("data-suffix") || "";
        let cur = 0;
        const dur = 1400;
        const start = performance.now();
        function tick(t) {
          const p = Math.min(1, (t - start) / dur);
          cur = Math.floor(target * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3))));
          el.textContent = cur + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => co.observe(c));
  }

  // ---- Product filter chips ----
  const chips = document.querySelectorAll("[data-filter]");
  if (chips.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const filter = chip.getAttribute("data-filter");
        chips.forEach((c) => c.classList.toggle("active", c === chip));
        document.querySelectorAll("[data-category]").forEach((card) => {
          const cat = card.getAttribute("data-category");
          card.style.display = filter === "all" || cat === filter ? "" : "none";
        });
      });
    });
  }

  // ---- Pre-fill contact form from query params ----
  const params = new URLSearchParams(location.search);
  const product = params.get("product");
  const inquiry = params.get("inquiry");
  const msg = document.querySelector("#message");
  if (msg && (product || inquiry)) {
    if (product) {
      msg.value = `Hello AAEJEY team, I'd like to enquire about your ${product}. Please send pricing and availability.\n\n`;
    } else if (inquiry === "export") {
      msg.value =
        "Hello AAEJEY team, I'm interested in becoming an international distributor / importer for your brands. Please send your export catalogue, MOQ, and shipping terms.\n\nCountry: \nCompany: \n";
    }
  }

  // ---- Contact form validation + Formspree ----
  const form = document.querySelector("#contact-form");
  if (form) {
    const success = document.querySelector("#form-success");
    const errEls = form.querySelectorAll(".form-error");
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setErr(name, msg) {
      const el = form.querySelector(`.form-error[data-for="${name}"]`);
      if (el) el.textContent = msg || "";
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errEls.forEach((el) => (el.textContent = ""));
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const address = (data.get("address") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      let ok = true;
      if (!name || name.length > 100) { setErr("name", "Please enter your name (max 100 chars)."); ok = false; }
      if (!emailRx.test(email) || email.length > 255) { setErr("email", "Enter a valid email address."); ok = false; }
      if (!phone || phone.length > 30) { setErr("phone", "Enter a valid phone number."); ok = false; }
      if (!address || address.length > 300) { setErr("address", "Please enter your address."); ok = false; }
      if (!message || message.length > 2000) { setErr("message", "Message is required (max 2000 chars)."); ok = false; }
      if (!ok) return;

      const endpoint = form.getAttribute("action");
      const btn = form.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";

      // If no endpoint set, fall back to mailto so the form still works.
      if (!endpoint || endpoint.includes("YOUR_FORMSPREE_ID")) {
        const body =
          `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n\n${message}`;
        location.href =
          "mailto:info@aaejey.com?subject=" +
          encodeURIComponent("Website enquiry from " + name) +
          "&body=" + encodeURIComponent(body);
        btn.disabled = false;
        btn.textContent = original;
        return;
      }

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (res.ok) {
          form.reset();
          if (success) {
            success.classList.add("show");
            success.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        } else {
          setErr("message", "Something went wrong. Please try again or email us directly.");
        }
      } catch (err) {
        setErr("message", "Network error. Please try again.");
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });
  }

  // ---- Year in footer ----
  const yr = document.querySelector("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
