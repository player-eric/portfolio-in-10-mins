import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "AA" },
    { name: "description", content: "Welcome to my portfolio" },
  ];
};

export default function About() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>TODO ABOUT</h1>
    </div>
  );
}
