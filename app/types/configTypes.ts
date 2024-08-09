type ContactOptions =
  | "email"
  | "linkedin"
  | "facebook"
  | "x"
  | "github"
  | "instagram"
  | "linkedin";

type RouteOptions = "about" | "skills" | "projects" | "footprints";

export interface Configs {
  routes: RouteOptions[];
  name: string;
  contacts: Record<ContactOptions, string>;
}
