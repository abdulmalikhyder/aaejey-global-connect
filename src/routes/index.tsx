import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { httpEquiv: "refresh", content: "0; url=/index.html" },
    ],
  }),
});

function Index() {
  useEffect(() => {
    window.location.replace("/index.html");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
      }}
    />
  );
}
