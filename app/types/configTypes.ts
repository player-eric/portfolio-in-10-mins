type ContactOptions =
  | "email"
  | "linkedin"
  | "facebook"
  | "x"
  | "github"
  | "instagram"
  | "linkedin";

export interface Configs {
  routes: { label: string; url: string }[];
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
  experiencePage?: {
    sectionName: string;
    items: {
      title: string;
      date?: string;
      location?: string;
      content: string;
    }[];
  }[];
  skillsPage?: {
    iconFileName?: string;
    name: string;
  }[];
  projectsPage?: {
    title: string;
    description: string;
    link?: string;
    pictureFileName?: string;
    skills?: string;
  }[];
}
