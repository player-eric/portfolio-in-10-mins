import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "AA" },
    { name: "description", content: "Welcome to my portfolio" },
  ];
};

export default function Experience() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>TODO Experience</h1>
    </div>
  );
}
