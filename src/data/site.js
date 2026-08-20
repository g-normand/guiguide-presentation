export const siteContent = {
  brandName: "Guiguide",
  mastheadHeading: "I'm Guillaume",
  mastheadTagline: "My name is Guillaume and I'm a Python engineer and a bird watcher. I'm constructing some webapps to have access bird informations easier.",
  navItems: [
    { label: "Webapps", targetId: "webapp" },
  ],
  appsById: {
    "bio_endemics": {
      id: "bio_endemics",
      title: "Bio Endemics",
      description: "Get the list of all bio-endemics you checked on eBird.",
      url: "https://guiguide.alwaysdata.net/bio_endemics/",
      previewImage: "/assets/previews/bio_endemics.png",
      alt: "bio_endemics preview",
      kind: "web",
    },
    "lista_roja_ecuador": {
      id: "lista_roja_ecuador",
      title: "Lista Roja Ecuador",
      description: "See the red list of the Ecuadorian birds",
      url: "https://guiguide.alwaysdata.net/lista_roja_ecuador/",
      previewImage: "/assets/previews/lista_roja_ecuador.png",
      alt: "lista_roja_ecuador preview",
      kind: "web",
    },
    "cero_report": {
      id: "cero_report",
      title: "CERO Reports",
      description: "Map of the last CERO report rare sightings.",
      url: "https://guiguide.alwaysdata.net/cero_report/",
      previewImage: "/assets/previews/cero_report.png",
      alt: "cero_report preview",
      kind: "web",
    },
    "cero_vs_ebird": {
      id: "cero_vs_ebird",
      title: "CERO vs eBird",
      description: "Birds in CERO reports versus birds in eBird EC.",
      url: "https://guiguide.alwaysdata.net/cero_vs_ebird/",
      previewImage: "/assets/previews/cero_vs_ebird.png",
      alt: "cero_vs_ebird preview",
      kind: "web",
    },
    "ecuador_birding": {
      id: "ecuador_birding",
      title: "Ecuador Birding",
      description:
        "Some informations about birds in Ecuador.",
      url: "https://g-normand.github.io/ecuador_birding/",
      previewImage: "/assets/previews/ecuador_birding.png",
      alt: "Ecuador Birding preview",
      kind: "web",
    },
    "ebird_plugin": {
      id: "ebird_plugin",
      title: "eBird plugin",
      description:
        "Some new features for eBird.",
      url: "https://github.com/g-normand/ebird_plugin/",
      previewImage: "/assets/previews/ebird_plugin.png",
      alt: "eBird plugin preview",
      kind: "web",
    },
    "faune_proche": {
      id: "faune_proche",
      title: "Faune Proche",
      description: "Trouvez les obs de Faune-France proche de chez vous.",
      url: "https://guiguide.alwaysdata.net/faune_proche",
      kind: "web",
    },
    "rare_birds_ecuador": {
      id: "rare_birds_ecuador",
      title: "Rare birds Ecuador",
      description: "Rare birds in Ecuador. I contributed (very little) to that awesome app, thanks again Raphaël for your work.",
      url: "https://zoziologie.raphaelnussbaumer.com/global-rare-ebird/?mode=r&r=EC&t=2&c=1",
      kind: "web",
    },
  },
  featuredAppIds: [
    "bio_endemics",
    "lista_roja_ecuador",
    "cero_report",
    "cero_vs_ebird",
    "ecuador_birding",
    "ebird_plugin",
  ],
  allAppsExtraIds: [
    "rare_birds_ecuador",
    "faune_proche",
  ],
  webapps: {
    title: "Webapps",
    intro: "",
  },
  footer: {
    heading: "Get in touch",
    columns: [
      {
        title: "",
        links: [
          {
            label: "iNaturalist",
            url: "https://www.inaturalist.org/people/gnormand",
            icon: "ai ai-inaturalist",
          },
          {
            label: "eBird",
            url: "https://ebird.org/profile/MTk3MzExNA/world",
            image: "/assets/ebird.svg",
          },
          { label: "GitHub", url: "https://github.com/g-normand/", icon: "fab fa-fw fa-github" },
        ],
      },
    ],
  },
  copyright: {
    owner: "Guillaume Normand",
    year: "2023-2026",
    sourceLabel: "Raphaël Nussbaumer",
    sourceUrl: "https://github.com/Rafnuss/rafnuss.github.io",
  },
};
