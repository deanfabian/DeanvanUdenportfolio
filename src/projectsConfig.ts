import { assetUrl } from './config';

export interface ProjectStill {
  id: string;
  image: string;
  characterDetail: string;
  characterDetailNl?: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  category: 'film' | 'social' | 'design' | 'photography';
  aspectRatio?: 'landscape' | 'portrait';
  cardAspectRatio?: 'landscape' | 'portrait';
  detailAspectRatio?: 'landscape' | 'portrait';
  title: string;
  displayTitle: string;
  workingTitle?: string;
  year: string;
  type: string;
  typeNl?: string;
  madeBy?: string;
  madeByNl?: string;
  note?: string;
  noteNl?: string;
  production?: string;
  myRole?: string;
  myRoleNl?: string;
  cardRole: string;
  cardRoleNl?: string;
  logline?: string;
  loglineNl?: string;
  tagline?: string;
  taglineNl?: string;
  outline?: string;
  outlineNl?: string;
  writtenBy?: string;
  writtenByLabel?: string;
  writtenByLabelNl?: string;
  crew?: string;
  cast?: string;
  locations?: string;
  shot?: string;
  links: {
    youtube?: string;
    imdb?: string;
    external?: string;
    externalLabel?: string;
    instagram?: string;
  };
  embedUrl?: string;
  card: {
    stillImage: string;
    previewVideo?: string;
    previewVideoWebm?: string;
  };
  stills: ProjectStill[];
}

export const PROJECTS: Record<string, Project> = {
  mustang: {
    id: 'mustang',
    slug: 'mustang',
    category: 'film',
    aspectRatio: 'landscape',
    title: 'Mustang (working title: The Mustang)',
    displayTitle: 'Mustang',
    workingTitle: 'The Mustang',
    year: '2026',
    type: 'Mockumentary, comedy',
    typeNl: 'Mockumentary, komedie',
    production: 'KennethChews Film Productions — BUas student production (Creative Business, AV specialization)',
    myRole: 'Producer · Casting · Co-writer',
    myRoleNl: 'Producent · Casting · Co-scenarist',
    cardRole: 'Producer',
    cardRoleNl: 'Producent',
    logline: '“Mustang” follows Cal “The Mustang” Dekker, a delusional man in his 30s who treats professional hobby horsing with the intensity of elite sport. After a doping scandal involving his stick horse, he attempts redemption at the World Cup in Finland, only to confront his estranged mother and a shocking family revelation.',
    loglineNl: '“Mustang” volgt Cal “The Mustang” Dekker, een dertiger die professioneel hobby horsing beleeft met de intensiteit van topsport. Na een dopingschandaal rond zijn stokpaard zoekt hij eerherstel op de World Cup in Finland, waar hij oog in oog komt te staan met zijn moeder en een schokkende familie-onthulling.',
    tagline: 'Serious actors for an unserious world.',
    taglineNl: 'Serieuze acteurs voor een onserieuze wereld.',
    outline: 'The Mustang is a mockumentary sports comedy that follows our main character, Cal Dekker. He is a self-declared hobby-horser who believes he is the best “horser” alive, shown through interviews, archival footage and documentary-style scenes. The film shows how obsessed Cal is with his sport and how complicated his relationship is with his father and trainer, Erik. The story switches between past and present: Cal’s childhood, his rise to fame in the hobby-horsing world, and the scandal that threatens his reputation.',
    outlineNl: 'The Mustang is een mockumentary sportkomedie rondom Cal Dekker, een zelfverklaarde topsporter die heilig gelooft dat hij de beste “hobby-horser” ter wereld is. Aan de hand van interviews, archiefbeelden en documentaire-scènes zien we zijn obsessie voor de sport en de beladen relatie met zijn vader en trainer Erik. Het verhaal schakelt tussen verleden en heden: Cals jeugd, zijn opmars naar wereldfaam en het schandaal dat zijn reputatie op het spel zet.',
    writtenBy: 'Sten van der Walle, Dean van Uden, Faye van Calck, Tristan van der Put, Younesse Hoek',
    writtenByLabel: 'Written by',
    writtenByLabelNl: 'Scenario door',
    crew: 'Producer — Dean van Uden · Director — Faye van Calck · DP — Younesse Hoek · Set Designer & Editor — Sten van der Walle · Audio — Tristan van der Put',
    cast: 'Luuk Muschiol (Cal Dekker) · Dolf Bekx (Erik Dekker) · Feliz van Uden (Julia) · Brenda B (Saskia)',
    locations: 'Rucphen · Ruitersportcentrum Breda · De Kragt, Breda · BUas, Breda',
    shot: 'March 2026',
    links: {
      youtube: 'https://www.youtube.com/watch?v=C_0ldSdmJhc',
      imdb: 'https://www.imdb.com/title/tt43028810/',
    },
    embedUrl: 'https://www.youtube-nocookie.com/embed/C_0ldSdmJhc',
    card: {
      stillImage: assetUrl('/assets/projects/mustang/hero.jpg'),
      previewVideo: assetUrl('/assets/projects/mustang/preview.mp4'),
      previewVideoWebm: assetUrl('/assets/projects/mustang/preview.webm'),
    },
    stills: [
      {
        id: 'erik',
        image: assetUrl('/assets/projects/mustang/still-1.jpg'),
        characterDetail: 'Erik Dekker, 50. Always carries a laminated training schedule.',
        characterDetailNl: 'Erik Dekker, 50. Heeft altijd een gelamineerd trainingsschema bij zich.',
        alt: 'Erik Dekker with his laminated training schedule',
      },
      {
        id: 'cal',
        image: assetUrl('/assets/projects/mustang/still-2.jpg'),
        characterDetail: 'Cal “The Mustang” Dekker. Treats hobby horsing as elite athletics.',
        characterDetailNl: 'Cal “The Mustang” Dekker. Beleeft hobby horsing met topsport-intensiteit.',
        alt: 'Cal Dekker in competition gear',
      },
      {
        id: 'gallus',
        image: assetUrl('/assets/projects/mustang/still-3.jpg'),
        characterDetail: 'Gallus Maximus. Listens to classical music in his stable.',
        characterDetailNl: 'Gallus Maximus. Luistert naar klassieke muziek in zijn stal.',
        alt: 'Gallus Maximus stick horse in stable',
      },
      {
        id: 'julia',
        image: assetUrl('/assets/projects/mustang/still-4.jpg'),
        characterDetail: 'Julia Al-Mamoet, 13. The next generation.',
        characterDetailNl: 'Julia Al-Mamoet, 13. De volgende generatie.',
        alt: 'Julia Al-Mamoet on the junior obstacle course',
      },
    ],
  },

  cracked: {
    id: 'cracked',
    slug: 'cracked',
    category: 'film',
    aspectRatio: 'landscape',
    title: 'CRACKED',
    displayTitle: 'CRACKED',
    year: '2025',
    type: 'Short film, drama',
    typeNl: 'Korte film, drama',
    production: 'Cannet Chews Productions — BUas PRO3 Audio Visual Production',
    myRole: 'Executive Producer · Co-writer',
    myRoleNl: 'Executive Producer · Co-scenarist',
    cardRole: 'Executive Producer',
    cardRoleNl: 'Executive Producer',
    logline: 'A perfectionist chef, renowned for his flawless dishes, must crack an egg perfectly to complete the greatest dish of his career. But when every attempt results in tiny shell fragments ruining the yolk, he embarks on an obsessive journey of late-night experiments and bizarre techniques to overcome his culinary curse.',
    loglineNl: 'Een perfectionistische kok, befaamd om zijn foutloze gerechten, moet één ei perfect breken om het meesterwerk van zijn carrière te voltooien. Wanneer elke poging strandt in minuscule schaaltjes in de dooier, verliest hij zichzelf in een obsessieve nachtelijke zoektocht.',
    tagline: 'Perfection is fragile.',
    taglineNl: 'Perfectionisme is breekbaar.',
    outline: 'CRACKED is an intimate character study about Victor, a talented young chef trapped in his pursuit of perfection. When asked to prepare a classic egg dish on live television, his hands freeze. The film explores the pressure of rising expectations and the thin boundary between discipline and mania.',
    outlineNl: 'CRACKED volgt Victor, een jonge getalenteerde kok die klem komt te zitten in zijn eigen drang naar perfectie. Wanneer hij op live televisie een klassiek eiergerecht moet bereiden, blokkeert hij. Een beklemmende verkenning van prestatiedruk en de wankele grens tussen vakmanschap en manie.',
    writtenBy: 'Dean van Uden, Sten van der Walle, Faye van Calck',
    writtenByLabel: 'Written by',
    writtenByLabelNl: 'Scenario door',
    crew: 'Executive Producer — Dean van Uden · Director — Faye van Calck · Cinematography — Younesse Hoek · Production Design — Sten van der Walle',
    cast: 'Kees van Lier (Victor) · Marieke Sanders (Elena) · Jan de Boer (Chef)',
    locations: 'Studio Keuken Breda · Restaurant Het Gerecht',
    shot: 'November 2025',
    links: {
      youtube: 'https://www.youtube.com/watch?v=YxEyU0bfrpA',
    },
    embedUrl: 'https://www.youtube-nocookie.com/embed/YxEyU0bfrpA',
    card: {
      stillImage: assetUrl('/assets/projects/cracked/hero.jpg'),
      previewVideo: assetUrl('/assets/projects/cracked/preview.mp4'),
      previewVideoWebm: assetUrl('/assets/projects/cracked/preview.webm'),
    },
    stills: [
      {
        id: 'victor',
        image: assetUrl('/assets/projects/cracked/still-1.jpg'),
        characterDetail: 'Victor, mid-twenties. Raised in a family of high achievers.',
        characterDetailNl: 'Victor, midden twintig. Opgegroeid in een familie van prestatiegerichte academici.',
        alt: 'Victor in the kitchen',
      },
      {
        id: 'elena',
        image: assetUrl('/assets/projects/cracked/still-2.jpg'),
        characterDetail: 'Elena, photographer. Raised to see failure as growth.',
        characterDetailNl: 'Elena, fotograaf. Opgevoed met het idee dat falen de sleutel tot groei is.',
        alt: 'Elena with camera',
      },
      {
        id: 'presenter',
        image: assetUrl('/assets/projects/cracked/still-3.jpg'),
        characterDetail: 'The Presenter. Used to be a chef himself.',
        characterDetailNl: 'De Presentator. Was ooit zelf chef-kok.',
        alt: 'The televised cooking show presenter',
      },
    ],
  },

  twins: {
    id: 'twins',
    slug: 'twins',
    category: 'social',
    aspectRatio: 'landscape',
    cardAspectRatio: 'landscape',
    detailAspectRatio: 'portrait',
    title: 'Brabant Twins — Social Media',
    displayTitle: 'Brabant Twins',
    year: '2024–heden',
    type: 'Content and club identity, Oosterhout',
    typeNl: 'Content en clubidentiteit, Oosterhout',
    madeBy: 'Dean van Uden',
    madeByNl: 'Gemaakt door Dean van Uden',
    cardRole: 'Social media',
    cardRoleNl: 'Social media',
    note: 'For baseball and softball club Brabant Twins in Oosterhout, I handle social media: matchday visuals, line-ups, video reels, and fieldside stories.',
    noteNl: 'Voor honkbal- en softbalclub Brabant Twins in Oosterhout verzorg ik de social media: wedstrijddag-visuals, line-ups, video-reels en sfeerimpressies langs het veld.',
    links: {
      external: 'https://www.instagram.com/brabanttwins/',
      externalLabel: 'Bekijk @brabanttwins op Instagram',
      instagram: 'https://www.instagram.com/brabanttwins/',
    },
    card: {
      stillImage: assetUrl('/assets/projects/twins/hero.jpg'),
    },
    stills: [
      {
        id: 'windsant',
        image: assetUrl('/assets/projects/twins/player-windsant.jpg'),
        characterDetail: '2026 Spelersaankondiging · Thomas Windsant (Catcher) met walk-up track "The Largest".',
        characterDetailNl: '2026 Spelersaankondiging · Thomas Windsant (Catcher) met walk-up track "The Largest".',
        alt: 'Thomas Windsant player announcement graphic',
      },
      {
        id: 'van-alebeek',
        image: assetUrl('/assets/projects/twins/player-van-alebeek.jpg'),
        characterDetail: '2026 Spelersaankondiging · Niek van Alebeek (Pitcher) met walk-up track "Tijdmachine".',
        characterDetailNl: '2026 Spelersaankondiging · Niek van Alebeek (Pitcher) met walk-up track "Tijdmachine".',
        alt: 'Niek van Alebeek player announcement graphic',
      },
    ],
  },

  'throwers-lab': {
    id: 'throwers-lab',
    slug: 'throwers-lab',
    category: 'social',
    aspectRatio: 'landscape',
    title: 'The Throwers Lab — Social Media & Marketing',
    displayTitle: 'The Throwers Lab',
    year: '2024–heden',
    type: 'Content, marketing and recruitment for pitcher development',
    typeNl: 'Content, marketing en werving voor pitcher-ontwikkeling',
    madeBy: 'Dean van Uden',
    madeByNl: 'Gemaakt door Dean van Uden',
    cardRole: 'Social media & marketing',
    cardRoleNl: 'Social media & marketing',
    note: 'For The Throwers Lab, a development program for young pitchers run together with a sports scientist, I handle content, marketing, recruitment and finances.',
    noteNl: 'Voor The Throwers Lab, een ontwikkelingsprogramma voor jonge werpers dat ik samen met een bewegingswetenschapper run, verzorg ik de content, marketing, werving en financiën.',
    links: {
      external: '#contact',
      externalLabel: 'Neem contact op over The Throwers Lab',
    },
    card: {
      stillImage: assetUrl('/assets/projects/throwers-lab/logo-dark.png'),
    },
    stills: [
      {
        id: 'logo-dark',
        image: assetUrl('/assets/projects/throwers-lab/logo-dark.png'),
        characterDetail: 'The Throwers Lab — Monogram & woordmerk (donker).',
        characterDetailNl: 'The Throwers Lab — Monogram & woordmerk (donker).',
        alt: 'The Throwers Lab logo on black background',
      },
      {
        id: 'logo-light',
        image: assetUrl('/assets/projects/throwers-lab/logo-light.png'),
        characterDetail: 'The Throwers Lab — Monogram & woordmerk (licht).',
        characterDetailNl: 'The Throwers Lab — Monogram & woordmerk (licht).',
        alt: 'The Throwers Lab logo on white background',
      },
    ],
  },

  'logo-design': {
    id: 'logo-design',
    slug: 'logo-design',
    category: 'design',
    aspectRatio: 'landscape',
    title: 'Logo Design',
    displayTitle: 'Logo Design',
    year: '2024–heden',
    type: 'Logo design & visual identity',
    typeNl: 'Logo-ontwerp & visuele identiteit',
    madeBy: 'Dean van Uden',
    madeByNl: 'Gemaakt door Dean van Uden',
    cardRole: 'Graphic design',
    cardRoleNl: 'Graphic design',
    note: 'Logo designs for Beyond Bases, Brabant Twins, and The Throwers Lab.',
    noteNl: 'Logo-ontwerpen voor onder meer Beyond Bases, Brabant Twins en The Throwers Lab.',
    links: {
      external: '#contact',
      externalLabel: 'Neem contact op voor logo design',
    },
    card: {
      stillImage: assetUrl('/assets/projects/logo-design/beyond-bases-logo.png'),
    },
    stills: [
      {
        id: 'beyond-bases',
        image: assetUrl('/assets/projects/logo-design/beyond-bases-logo.png'),
        characterDetail: 'Beyond Bases · Beeldmerk.',
        characterDetailNl: 'Beyond Bases · Beeldmerk.',
        alt: 'Beyond Bases logo beeldmerk',
      },
      {
        id: 'twins-refined',
        image: assetUrl('/assets/projects/logo-design/brabant-twins-refined.png'),
        characterDetail: 'Brabant Twins · Verfijnd logo voor Instagram.',
        characterDetailNl: 'Brabant Twins · Verfijnd logo voor Instagram.',
        alt: 'Brabant Twins verfijnd logo voor Instagram',
      },
      {
        id: 'ttl-dark',
        image: assetUrl('/assets/projects/logo-design/logo-dark.png'),
        characterDetail: 'The Throwers Lab · Donkere lockup.',
        characterDetailNl: 'The Throwers Lab · Donkere lockup.',
        alt: 'The Throwers Lab logo donkere lockup',
      },
      {
        id: 'ttl-light',
        image: assetUrl('/assets/projects/logo-design/logo-light.png'),
        characterDetail: 'The Throwers Lab · Lichte lockup.',
        characterDetailNl: 'The Throwers Lab · Lichte lockup.',
        alt: 'The Throwers Lab logo lichte lockup',
      },
    ],
  },

  'beyond-bases': {
    id: 'beyond-bases',
    slug: 'beyond-bases',
    category: 'design',
    aspectRatio: 'landscape',
    title: 'Beyond Bases — Brandbook',
    displayTitle: 'Beyond Bases',
    year: '2024–heden',
    type: 'Brandbook & visual identity',
    typeNl: 'Brandbook & visuele identiteit',
    madeBy: 'Dean van Uden',
    madeByNl: 'Gemaakt door Dean van Uden',
    cardRole: 'Brand identity',
    cardRoleNl: 'Brand identity',
    note: 'Brandbook for Beyond Bases (Wear Your Story and Color Palette pages). A look into my process and brand identity.',
    noteNl: 'Brandbook voor Beyond Bases (pagina’s Wear Your Story en Color Palette). Een inkijk in mijn werkwijze en merkidentiteit.',
    links: {
      external: '#contact',
      externalLabel: 'Neem contact op over Beyond Bases',
    },
    card: {
      stillImage: assetUrl('/assets/projects/beyond-bases/wear-your-story.png'),
    },
    stills: [
      {
        id: 'wear-your-story',
        image: assetUrl('/assets/projects/beyond-bases/wear-your-story.png'),
        characterDetail: 'Wear Your Story · Brand manifesto spread.',
        characterDetailNl: 'Wear Your Story · Brand manifesto spread.',
        alt: 'Beyond Bases Wear Your Story brand manifesto spread',
      },
      {
        id: 'color-palette',
        image: assetUrl('/assets/projects/beyond-bases/colors.png'),
        characterDetail: 'Color Palette & Usage · Midnight Navy, Off-White, Sage Wellness en Diamond Clay.',
        characterDetailNl: 'Color Palette & Usage · Midnight Navy, Off-White, Sage Wellness en Diamond Clay.',
        alt: 'Beyond Bases color palette and usage page',
      },
    ],
  },

  'twins-graphics': {
    id: 'twins-graphics',
    slug: 'twins-graphics',
    category: 'design',
    aspectRatio: 'portrait',
    title: 'Brabant Twins — Spelersaankondigingen',
    displayTitle: 'Spelersaankondigingen',
    year: '2025–2026',
    type: 'Social media graphics, Oosterhout',
    typeNl: 'Social media graphics, Oosterhout',
    madeBy: 'Dean van Uden',
    madeByNl: 'Gemaakt door Dean van Uden',
    cardRole: 'Graphic design',
    cardRoleNl: 'Graphic design',
    note: 'Graphics created for Brabant Twins to announce new players for the 2026 season.',
    noteNl: 'Graphics gemaakt voor Brabant Twins om nieuwe spelers voor het seizoen 2026 in het team aan te kondigen.',
    links: {
      instagram: 'https://www.instagram.com/brabanttwins/',
      externalLabel: 'Bekijk @brabanttwins op Instagram',
    },
    card: {
      stillImage: assetUrl('/assets/projects/twins-graphics/thomas-windsant.jpg'),
    },
    stills: [
      {
        id: 'windsant',
        image: assetUrl('/assets/projects/twins-graphics/thomas-windsant.jpg'),
        characterDetail: 'Thomas Windsant · Catcher met walk-up track "The Largest".',
        characterDetailNl: 'Thomas Windsant · Catcher met walk-up track "The Largest".',
        alt: 'Brabant Twins 2026 player announcement graphic for Thomas Windsant',
      },
      {
        id: 'van-alebeek',
        image: assetUrl('/assets/projects/twins-graphics/niek-van-alebeek.jpg'),
        characterDetail: 'Niek van Alebeek · Pitcher met walk-up track "Tijdmachine".',
        characterDetailNl: 'Niek van Alebeek · Pitcher met walk-up track "Tijdmachine".',
        alt: 'Brabant Twins 2026 player announcement graphic for Niek van Alebeek',
      },
    ],
  },

  'boer-tot-bord': {
    id: 'boer-tot-bord',
    slug: 'boer-tot-bord',
    category: 'design',
    aspectRatio: 'landscape',
    title: 'Boer tot Bord Altena — Webdesign',
    displayTitle: 'Boer tot Bord Altena',
    year: '2024',
    type: 'Website design & interface, BUas',
    typeNl: 'Website design & interface, BUas',
    madeBy: 'Dean van Uden (onder andere)',
    madeByNl: 'Gemaakt door Dean van Uden (onder andere)',
    cardRole: 'Web design',
    cardRoleNl: 'Webdesign',
    note: 'Website design for a school project at Creative Business at BUas for Farm to Fork Altena. The goal was to show how food travels locally from the farmer to the plate at home.',
    noteNl: 'Websiteontwerp voor een schoolproject bij Creative Business aan BUas voor Boer tot Bord Altena. Het doel was om de lokale weg van het voedsel van boer naar bord in beeld te brengen.',
    links: {
      external: '#contact',
      externalLabel: 'Neem contact op over webdesign',
    },
    card: {
      stillImage: assetUrl('/assets/projects/boer-tot-bord/frontpage.jpg'),
    },
    stills: [
      {
        id: 'hero-frontpage',
        image: assetUrl('/assets/projects/boer-tot-bord/frontpage.jpg'),
        characterDetail: 'Homepage Hero · "Van eigen bodem, rechtstreeks naar jouw bord."',
        characterDetailNl: 'Homepage Hero · "Van eigen bodem, rechtstreeks naar jouw bord."',
        alt: 'Lekker van Hier Boer tot Bord Altena website front page',
      },
    ],
  },

  unpluggd: {
    id: 'unpluggd',
    slug: 'unpluggd',
    category: 'design',
    aspectRatio: 'portrait',
    title: 'Unplugg’d Magazine — Cover',
    displayTitle: 'Unplugg’d Magazine',
    year: '2024',
    type: 'Magazine cover & editorial design, BUas',
    typeNl: 'Magazine cover & editorial design, BUas',
    madeBy: 'Dean van Uden (onder andere)',
    madeByNl: 'Gemaakt door Dean van Uden (onder andere)',
    cardRole: 'Editorial design',
    cardRoleNl: 'Editorial design',
    note: 'Cover for the magazine Unplugg’d. Our first school project at Creative Business at BUas.',
    noteNl: 'Cover van het magazine Unplugg’d. Ons eerste schoolproject bij de opleiding Creative Business aan BUas.',
    links: {
      external: '#contact',
      externalLabel: 'Neem contact op over editorial design',
    },
    card: {
      stillImage: assetUrl('/assets/projects/unpluggd/cover.jpg'),
    },
    stills: [
      {
        id: 'cover',
        image: assetUrl('/assets/projects/unpluggd/cover.jpg'),
        characterDetail: 'Cover Unplugg’d Nr. 1 · "When screens fade away".',
        characterDetailNl: 'Cover Unplugg’d Nr. 1 · "When screens fade away".',
        alt: 'Unpluggd magazine cover design',
      },
    ],
  },

  photography: {
    id: 'photography',
    slug: 'sportfotografie',
    category: 'photography',
    aspectRatio: 'landscape',
    title: 'Sportfotografie — Softbal & Honkbal',
    displayTitle: 'Sportfotografie',
    year: '2024–heden',
    type: 'Wedstrijd- & actiefotografie, Oosterhout',
    typeNl: 'Wedstrijd- & actiefotografie, Oosterhout',
    madeBy: 'Dean van Uden',
    madeByNl: 'Gemaakt door Dean van Uden',
    cardRole: 'Fotografie',
    cardRoleNl: 'Fotografie',
    note: 'Softball photography along the field.',
    noteNl: 'Softbalfotografie langs het veld.',
    links: {
      external: '#contact',
      externalLabel: 'Neem contact op voor fotoreportages',
    },
    card: {
      stillImage: assetUrl('/assets/projects/photography/catcher.jpg'),
    },
    stills: [
      {
        id: 'catcher',
        image: assetUrl('/assets/projects/photography/catcher.jpg'),
        characterDetail: 'Focus achter het masker · Catcher in wedstrijduitrusting.',
        characterDetailNl: 'Focus achter het masker · Catcher in wedstrijduitrusting.',
        alt: 'Softball catcher portret in wedstrijduitrusting',
      },
      {
        id: 'diamond-action',
        image: assetUrl('/assets/projects/photography/action.jpg'),
        characterDetail: 'Het moment van de slag · Slagvrouw, catcher en scheidsrechter op de thuisplaat.',
        characterDetailNl: 'Het moment van de slag · Slagvrouw, catcher en scheidsrechter op de thuisplaat.',
        alt: 'Softbal actieshot bij de thuisplaat met slagvrouw, catcher en scheidsrechter',
      },
    ],
  },
};

// Aliases for convenience
PROJECTS['the-throwers-lab'] = PROJECTS['throwers-lab'];
PROJECTS.throwersLab = PROJECTS['throwers-lab'];
PROJECTS['graphic-design'] = PROJECTS['logo-design'];
PROJECTS['logoDesign'] = PROJECTS['logo-design'];
PROJECTS['beyondbases'] = PROJECTS['beyond-bases'];
PROJECTS['twinsgraphics'] = PROJECTS['twins-graphics'];
PROJECTS['twins-player-announcements'] = PROJECTS['twins-graphics'];
PROJECTS['boertotbord'] = PROJECTS['boer-tot-bord'];
PROJECTS['lekker-van-hier'] = PROJECTS['boer-tot-bord'];
PROJECTS['unplugg-d'] = PROJECTS.unpluggd;
PROJECTS['sportfotografie'] = PROJECTS.photography;
