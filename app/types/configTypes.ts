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
  colors: {
    primary: string;
    background: string;
  };
  navBar: {
    name: string;
    contacts: Record<ContactOptions, string>;
  };
  aboutPage: {
    greeting: string;
    content: string;
  };
  experiencePage: {
    sectionName: string;
    items: {
      title: string;
      date?: string;
      location?: string;
      content: string;
    }[];
  }[];
}
