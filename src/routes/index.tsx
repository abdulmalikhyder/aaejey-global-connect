import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Redirect the React preview straight to the static site at /index.html.
  // The real website lives in /public/*.html — this React shell is only used
  // by the Lovable in-browser preview.
  useEffect(() => {
    window.location.replace("/index.html");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#0c2340",
        color: "#fff",
        padding: "40px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, marginBottom: 12 }}>
          AAEJEY website
        </h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          Loading the static site… If it doesn't redirect, click below.
        </p>
        <a
          href="/index.html"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            background: "#d4a84c",
            color: "#0c2340",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Open the website →
        </a>
        <p style={{ opacity: 0.6, fontSize: 13, marginTop: 24 }}>
          All files live in <code>public/</code>. See <code>public/README.md</code> for
          deploy instructions.
        </p>
      </div>
    </div>
  );
}
