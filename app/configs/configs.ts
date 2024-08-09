import { Configs } from "~/types/configTypes";

const configs: Configs = {
  routes: ["about", "experience", "skills", "projects", "footprints"],
  colors: {
    primary: "#FFD562",
    background: "#FFE591",
  },
  navBar: {
    name: "Shiqin Yan",
    contacts: {
      email: "digimonyan@gmail.com",
      facebook: "",
      x: "",
      github: "https://github.com/player-eric",
      instagram: "https://www.instagram.com/digimonyan/",
      linkedin: "https://www.linkedin.com/in/shiqin-yan/",
    },
  },
  aboutPage: {
    greeting: "Hi!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum lacus sit amet rhoncus fringilla. Duis vestibulum non leo eget blandit. Cras vel erat volutpat, bibendum ex facilisis, gravida sem. Vivamus commodo lobortis enim iaculis blandit. Vestibulum laoreet quam id sodales rhoncus. In vulputate purus in tincidunt scelerisque. Nullam congue dui nisi, sed ornare leo fringilla porttitor. Sed consequat massa nec imperdiet interdum. Fusce cursus dictum dignissim. In ex enim, tristique at luctus ornare, ultricies posuere enim. Duis et augue eget lorem vulputate feugiat. Maecenas id leo in mi hendrerit tincidunt. Donec blandit massa odio, quis elementum ligula iaculis placerat. Vestibulum vitae sodales felis.",
  },
};

export default configs;
