type ContactOptions =
  | "email"
  | "linkedin"
  | "facebook"
  | "x"
  | "github"
  | "instagram"
  | "linkedin";

type RouteOptions =
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "footprints";

export interface Configs {
  routes: RouteOptions[];
  navBar: {
    name: string;
    contacts: Record<ContactOptions, string>;
  };
}
