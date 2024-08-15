import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Navbar } from "./components/Navbar";
import stylesheet from "~/tailwind.css?url";
import { LinksFunction } from "@remix-run/node";
import configs from "./configs/configs";
import About from "./routes/about";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "pictures/icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Shiqin Yan</title>
        <meta charSet="utf-8" />
        <meta name="description" content="About Shiqin Yan" />
        <meta
          name="keywords"
          content="personal, website, about, profile,, Shiqin Yan"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={`flex flex-col min-h-screen`}
        style={{ backgroundColor: configs.colors.background }}
      >
        <Navbar />

        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="w-full md:w-5/6 mx-auto">
      <Outlet />
    </div>
  );
}

export function HydrateFallback() {
  // for crawlers
  return (
    <div className="w-full flex items-center">
      <About></About>
    </div>
  );
}
