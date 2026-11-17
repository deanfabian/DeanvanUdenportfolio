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
  title: string;
  displayTitle: string;
  workingTitle?: string;
  year: string;
  type: string;
  typeNl?: string;
  production: string;
  myRole: string;
  myRoleNl?: string;
  cardRole: string;
  cardRoleNl?: string;
  logline: string;
  loglineNl?: string;
  tagline?: string;
  taglineNl?: string;
  outline: string;
  outlineNl?: string;
  writtenBy: string;
  writtenByLabel?: string;
  writtenByLabelNl?: string;
  crew: string;
  cast: string;
  locations: string;
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
    title: 'Brabant Twins — Social Media',
    displayTitle: 'Brabant Twins',
    year: '2024–heden',
    type: 'Content and club identity, Oosterhout',
    typeNl: 'Content en clubidentiteit, Oosterhout',
    production: 'Brabant Twins Honkbal & Softbal — Oosterhout',
    myRole: 'Social media',
    myRoleNl: 'Social media',
    cardRole: 'Social media',
    cardRoleNl: 'Social media',
    tagline: 'Capturing the momentum of European baseball.',
    taglineNl: 'De verhalen en clubcultuur van Brabant Twins.',
    logline: 'Voor honkbal- en softbalclub Brabant Twins in Oosterhout verzorg ik de social media: wedstrijddag-visuals, line-ups, video-reels en sfeerimpressies langs het veld.',
    loglineNl: 'Voor honkbal- en softbalclub Brabant Twins in Oosterhout verzorg ik de social media: wedstrijddag-visuals, line-ups, video-reels en sfeerimpressies langs het veld.',
    outline: 'Voor Brabant Twins ligt de focus op de mensen binnen de club. Niet alleen de stand op het scorebord, maar de spanning in de dug-out, de voorbereiding van de werpers en de energie van het team. Consistente beeldtaal rondom speelweekenden brengt de sport dichtbij fans en de lokale gemeenschap.',
    outlineNl: 'Voor Brabant Twins ligt de focus op de mensen binnen de club. Niet alleen de stand op het scorebord, maar de spanning in de dug-out, de voorbereiding van de werpers en de energie van het team. Consistente beeldtaal rondom speelweekenden brengt de sport dichtbij fans en de lokale gemeenschap.',
    writtenBy: 'Wedstrijddag Content · Instagram Reels · Fotografie · Clubidentiteit',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Social Media & Content — Dean van Uden · Club & Organisatie — Brabant Twins Oosterhout',
    cast: 'Heren 1, Heren 2 en jeugdteams Brabant Twins',
    locations: 'Sportpark De Slotbosse Toren, Oosterhout',
    links: {
      external: 'https://www.instagram.com/brabanttwins/',
      externalLabel: 'Bekijk @brabanttwins op Instagram',
      instagram: 'https://www.instagram.com/brabanttwins/',
    },
    card: {
      stillImage: assetUrl('/assets/projects/twins/hero.jpg'),
      previewVideo: assetUrl('/assets/projects/twins/preview.mp4'),
      previewVideoWebm: assetUrl('/assets/projects/twins/preview.webm'),
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
      {
        id: 'gameday',
        image: assetUrl('/assets/projects/twins/still-1.jpg'),
        characterDetail: 'Matchday Line-ups & Stories. Directe publicatie tijdens het speelweekend.',
        characterDetailNl: 'Matchday Line-ups & Stories. Directe publicatie tijdens het speelweekend.',
        alt: 'Matchday line-up visual',
      },
      {
        id: 'action',
        image: assetUrl('/assets/projects/twins/still-2.jpg'),
        characterDetail: 'Diamond Intensity. De focus op de heuvel voor de eerste worp.',
        characterDetailNl: 'Diamond Intensity. De focus op de heuvel voor de eerste worp.',
        alt: 'Pitcher mechanics visual',
      },
      {
        id: 'culture',
        image: assetUrl('/assets/projects/twins/still-3.jpg'),
        characterDetail: 'Next Gen Twins. Jeugdclinics en clubcultuur op en rondom het veld.',
        characterDetailNl: 'Next Gen Twins. Jeugdclinics en clubcultuur op en rondom het veld.',
        alt: 'Youth baseball clinic',
      },
    ],
  },

  'throwers-lab': {
    id: 'throwers-lab',
    slug: 'throwers-lab',
    category: 'social',
    title: 'The Throwers Lab — Social Media & Marketing',
    displayTitle: 'The Throwers Lab',
    year: '2024–heden',
    type: 'Content, marketing and recruitment for a pitcher development program',
    typeNl: 'Content, marketing en werving voor een ontwikkelingsprogramma voor werpers',
    production: 'The Throwers Lab',
    myRole: 'Social media & marketing',
    myRoleNl: 'Social media & marketing',
    cardRole: 'Social media & marketing',
    cardRoleNl: 'Social media & marketing',
    tagline: 'Content, marketing and recruitment for a pitcher development program.',
    taglineNl: 'Content, marketing en werving voor een ontwikkelingsprogramma voor werpers.',
    logline: 'Voor The Throwers Lab, een ontwikkelingsprogramma voor jonge werpers dat ik samen met een bewegingswetenschapper run, doe ik alles achter de schermen: content, marketing, werving en financiën.',
    loglineNl: 'Voor The Throwers Lab, een ontwikkelingsprogramma voor jonge werpers dat ik samen met een bewegingswetenschapper run, doe ik alles achter de schermen: content, marketing, werving en financiën.',
    outline: 'The Throwers Lab combineert bewegingswetenschap en pitcher-ontwikkeling. Mijn rol is alles achter de schermen: het documenteren van meetdata en trainingssessies in heldere videocontent, het opzetten van marketingcampagnes, de werving van nieuwe talenten en het financieel beheer van het programma.',
    outlineNl: 'The Throwers Lab combineert bewegingswetenschap en pitcher-ontwikkeling. Mijn rol is alles achter de schermen: het documenteren van meetdata en trainingssessies in heldere videocontent, het opzetten van marketingcampagnes, de werving van nieuwe talenten en het financieel beheer van het programma.',
    writtenBy: 'Contentcreatie · Marketingcampagnes · Talentenwerving · Financiën',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Content, Marketing & Werving — Dean van Uden · Bewegingswetenschap — The Throwers Lab',
    cast: 'Werpers & coaches in opleiding',
    locations: 'Breda & Oosterhout',
    links: {
      external: '#',
      externalLabel: 'The Throwers Lab',
    },
    card: {
      stillImage: assetUrl('/assets/projects/throwers-lab/logo-dark.png'),
      previewVideo: assetUrl('/assets/projects/throwers-lab/preview.mp4'),
      previewVideoWebm: assetUrl('/assets/projects/throwers-lab/preview.webm'),
    },
    stills: [
      {
        id: 'logo-dark',
        image: assetUrl('/assets/projects/throwers-lab/logo-dark.png'),
        characterDetail: 'The Throwers Lab — Monogram & Wordmark (Dark). Dynamic angles mirroring the arm slot and pitching mechanics.',
        characterDetailNl: 'The Throwers Lab — Monogram & woordmerk (donker). Dynamische hoeken die de armactie en biomechanica van een werper weerspiegelen.',
        alt: 'The Throwers Lab logo on black background',
      },
      {
        id: 'logo-light',
        image: assetUrl('/assets/projects/throwers-lab/logo-light.png'),
        characterDetail: 'The Throwers Lab — Monogram & Wordmark (Light). High-contrast visual identity for print, jerseys and documentation.',
        characterDetailNl: 'The Throwers Lab — Monogram & woordmerk (licht). Contrastrijke visuele identiteit voor print, teamkleding en documentatie.',
        alt: 'The Throwers Lab logo on white background',
      },
      {
        id: 'mechanics',
        image: assetUrl('/assets/projects/throwers-lab/still-1.jpg'),
        characterDetail: 'Throwing Mechanics & High-Speed Analysis.',
        characterDetailNl: 'Bewegingsanalyse en biomechanica van jonge werpers in beeld gebracht.',
        alt: 'Throwing mechanics analysis',
      },
      {
        id: 'drills',
        image: assetUrl('/assets/projects/throwers-lab/still-2.jpg'),
        characterDetail: 'Bullpen & Pitch Design Sessions.',
        characterDetailNl: 'Gerichte trainingssessies en individuele werpbegeleiding.',
        alt: 'Bullpen practice session',
      },
      {
        id: 'recruitment',
        image: assetUrl('/assets/projects/throwers-lab/still-3.jpg'),
        characterDetail: 'Program Recruitment & Outreach.',
        characterDetailNl: 'Werving en communicatie voor de volgende generatie atleten.',
        alt: 'Talent recruitment outreach',
      },
    ],
  },

  'logo-design': {
    id: 'logo-design',
    slug: 'logo-design',
    category: 'design',
    title: 'Logo Design — The Throwers Lab & Visual Identity',
    displayTitle: 'Logo Design',
    year: '2024–heden',
    type: 'Logo & visual identity · The Throwers Lab',
    typeNl: 'Logo & visuele identiteit · The Throwers Lab',
    production: 'The Throwers Lab & Visual Identity Archive',
    myRole: 'Graphic Designer',
    myRoleNl: 'Grafisch ontwerper',
    cardRole: 'Graphic design',
    cardRoleNl: 'Graphic design',
    tagline: 'Bold geometry and kinetic momentum built for athlete development.',
    taglineNl: 'Krachtige geometrie en voorwaartse dynamiek ontworpen voor pitcher-ontwikkeling.',
    logline: 'Visuele identiteit en logo-ontwerp voor The Throwers Lab: een dynamisch monogram dat de armactie van een werper vangt in een strak, atletisch beeldmerk.',
    loglineNl: 'Visuele identiteit en logo-ontwerp voor The Throwers Lab: een dynamisch monogram dat de armactie van een werper vangt in een strak, atletisch beeldmerk.',
    outline: 'Voor The Throwers Lab ontwierp ik de visuele identiteit vanuit de fysieke realiteit van de sport: kinetische energie, explosiviteit en precisie. Het monogram combineert de letters T en L in een voorwaartse hellingshoek die direct refereert aan de armslot en release point van een pitcher. De typografie is robuust en modern, geoptimaliseerd voor zowel digitale analyse-video’s als kleding en fysiek trainingsmateriaal.',
    outlineNl: 'Voor The Throwers Lab ontwierp ik de visuele identiteit vanuit de fysieke realiteit van de sport: kinetische energie, explosiviteit en precisie. Het monogram combineert de letters T en L in een voorwaartse hellingshoek die direct refereert aan de armslot en release point van een pitcher. De typografie is robuust en modern, geoptimaliseerd voor zowel digitale analyse-video’s als kleding en fysiek trainingsmateriaal.',
    writtenBy: 'Logo Design · Typografie · Monogramontwikkeling · Vormgeving',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Grafisch Ontwerp — Dean van Uden · Identiteit — The Throwers Lab',
    cast: 'Monogram (TTL) & Typografisch Woordmerk',
    locations: 'Oosterhout & Breda',
    links: {
      external: '#throwers-lab',
      externalLabel: 'Bekijk The Throwers Lab project',
    },
    card: {
      stillImage: assetUrl('/assets/projects/logo-design/logo-dark.png'),
      previewVideo: assetUrl('/assets/projects/throwers-lab/preview.mp4'),
      previewVideoWebm: assetUrl('/assets/projects/throwers-lab/preview.webm'),
    },
    stills: [
      {
        id: 'ttl-dark',
        image: assetUrl('/assets/projects/logo-design/logo-dark.png'),
        characterDetail: 'The Throwers Lab — Donkere lockup. Wit monogram op zwart met voorwaartse dynamiek.',
        characterDetailNl: 'The Throwers Lab — Donkere lockup. Wit monogram op zwart met voorwaartse dynamiek.',
        alt: 'The Throwers Lab logo dark version',
      },
      {
        id: 'ttl-light',
        image: assetUrl('/assets/projects/logo-design/logo-light.png'),
        characterDetail: 'The Throwers Lab — Lichte lockup. Zwart monogram op wit voor print, kleding en briefpapier.',
        characterDetailNl: 'The Throwers Lab — Lichte lockup. Zwart monogram op wit voor print, kleding en briefpapier.',
        alt: 'The Throwers Lab logo light version',
      },
    ],
  },

  'beyond-bases': {
    id: 'beyond-bases',
    slug: 'beyond-bases',
    category: 'design',
    title: 'Beyond Bases — Brandbook & Visuele Identiteit',
    displayTitle: 'Beyond Bases',
    year: '2024–heden',
    type: 'Brandbook & visual identity',
    typeNl: 'Brandbook & visuele identiteit',
    production: 'Beyond Bases — Baseball Mindset & Apparel',
    myRole: 'Founder & Brand Designer',
    myRoleNl: 'Oprichter & brand designer',
    cardRole: 'Brand identity',
    cardRoleNl: 'Brand identity',
    tagline: 'Wear your story. Kleding als drager van mentale veerkracht.',
    taglineNl: 'Wear your story. Kleding als drager van mentale veerkracht.',
    logline: 'Het officiële brandbook voor Beyond Bases: een purpose-driven kledingmerk voor Europese honkballers dat het taboe rond mentale gezondheid in de sport doorbreekt.',
    loglineNl: 'Het officiële brandbook voor Beyond Bases: een purpose-driven kledingmerk voor Europese honkballers dat het taboe rond mentale gezondheid in de sport doorbreekt.',
    outline: 'Beyond Bases combineert sport, cultuur en emotioneel welzijn. In het brandbook legde ik de complete merkidentiteit vast: van de overkoepelende filosofie "Wear Your Story" tot de tone of voice en het doordachte kleurenpalet (Midnight Navy, Off-White, Sage Wellness en Diamond Clay, direct geïnspireerd op het gravel van het infield).',
    outlineNl: 'Beyond Bases combineert sport, cultuur en emotioneel welzijn. In het brandbook legde ik de complete merkidentiteit vast: van de overkoepelende filosofie "Wear Your Story" tot de tone of voice en het doordachte kleurenpalet (Midnight Navy, Off-White, Sage Wellness en Diamond Clay, direct geïnspireerd op het gravel van het infield).',
    writtenBy: 'Merkstrategie · Brandbook Design · Typografie · Kleurenpalet',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Brand Concept & Design — Dean van Uden · Merk — Beyond Bases',
    cast: 'Wear Your Story Manifesto & Color System',
    locations: 'Breda & Oosterhout',
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
        characterDetail: 'Wear Your Story · De kernboodschap: kleding als medium voor openheid en mentale kracht.',
        characterDetailNl: 'Wear Your Story · De kernboodschap: kleding als medium voor openheid en mentale kracht.',
        alt: 'Beyond Bases Wear Your Story brand manifesto spread',
      },
      {
        id: 'color-palette',
        image: assetUrl('/assets/projects/beyond-bases/colors.png'),
        characterDetail: 'Color Palette & Usage · Midnight Navy, Off-White, Sage Wellness en Diamond Clay (infield gravel).',
        characterDetailNl: 'Color Palette & Usage · Midnight Navy, Off-White, Sage Wellness en Diamond Clay (infield gravel).',
        alt: 'Beyond Bases color palette and usage page',
      },
    ],
  },

  'twins-graphics': {
    id: 'twins-graphics',
    slug: 'twins-graphics',
    category: 'design',
    title: 'Brabant Twins — Spelersaankondigingen 2026',
    displayTitle: 'Spelersaankondigingen',
    year: '2025–2026',
    type: 'Social media graphics & visual design',
    typeNl: 'Social media graphics & visueel ontwerp',
    production: 'Brabant Twins Oosterhout',
    myRole: 'Visual Designer & Social Media',
    myRoleNl: 'Visueel ontwerper & social media',
    cardRole: 'Graphic design',
    cardRoleNl: 'Graphic design',
    tagline: 'Karaktervolle social media graphics voor de 2026-selectie van Brabant Twins.',
    taglineNl: 'Karaktervolle social media graphics voor de 2026-selectie van Brabant Twins.',
    logline: 'Instagram-aankondigingsposters voor nieuwe spelers van Brabant Twins, vormgegeven met dynamische actie-uitsnedes, vintage texturen en persoonlijke walk-up nummers.',
    loglineNl: 'Instagram-aankondigingsposters voor nieuwe spelers van Brabant Twins, vormgegeven met dynamische actie-uitsnedes, vintage texturen en persoonlijke walk-up nummers.',
    outline: 'Voor de transfers van het seizoen 2026 ontwierp ik een serie krachtige visuals die de energie van honkbal combineren met popcultuur. Elke poster bevat dynamische uitsparingen van de atleet in actie, clubkleuren, getextureerde achtergronden en een gestileerde Spotify-player met de walk-up track van de speler (zoals "Tijdmachine" voor Niek van Alebeek en "The Largest" voor Thomas Windsant).',
    outlineNl: 'Voor de transfers van het seizoen 2026 ontwierp ik een serie krachtige visuals die de energie van honkbal combineren met popcultuur. Elke poster bevat dynamische uitsparingen van de atleet in actie, clubkleuren, getextureerde achtergronden en een gestileerde Spotify-player met de walk-up track van de speler (zoals "Tijdmachine" voor Niek van Alebeek en "The Largest" voor Thomas Windsant).',
    writtenBy: 'Grafisch Ontwerp · Beeldbewerking · Poster Design · Typografie',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Visual Design & Content — Dean van Uden · Club — Brabant Twins',
    cast: 'Thomas Windsant (Catcher) · Niek van Alebeek (Pitcher)',
    locations: 'Oosterhout',
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
        characterDetail: 'Thomas Windsant · Catcher in actie, donkerblauw reliëf en track-overlay "The Largest".',
        characterDetailNl: 'Thomas Windsant · Catcher in actie, donkerblauw reliëf en track-overlay "The Largest".',
        alt: 'Brabant Twins 2026 player announcement graphic for Thomas Windsant',
      },
      {
        id: 'van-alebeek',
        image: assetUrl('/assets/projects/twins-graphics/niek-van-alebeek.jpg'),
        characterDetail: 'Niek van Alebeek · Pitcher in beweging, oranje typografie en track-overlay "Tijdmachine".',
        characterDetailNl: 'Niek van Alebeek · Pitcher in beweging, oranje typografie en track-overlay "Tijdmachine".',
        alt: 'Brabant Twins 2026 player announcement graphic for Niek van Alebeek',
      },
    ],
  },

  'boer-tot-bord': {
    id: 'boer-tot-bord',
    slug: 'boer-tot-bord',
    category: 'design',
    title: 'Lekker van Hier — Boer tot Bord Altena',
    displayTitle: 'Boer tot Bord Altena',
    year: '2024',
    type: 'Website design & interface concept, BUas',
    typeNl: 'Website design & interface concept, BUas',
    production: 'Living Lab Boer tot Bord Altena · Schoolproject BUas',
    myRole: 'UI / Web Designer',
    myRoleNl: 'UI / Webdesigner',
    cardRole: 'Web design',
    cardRoleNl: 'Webdesign',
    tagline: 'Van eigen bodem, rechtstreeks naar jouw bord.',
    taglineNl: 'Van eigen bodem, rechtstreeks naar jouw bord.',
    logline: 'Websiteontwerp voor het Living Lab Boer tot Bord in de regio Altena: een lokaal platform dat de keten tussen boer, verwerker en consument korter en inzichtelijk maakt.',
    loglineNl: 'Websiteontwerp voor het Living Lab Boer tot Bord in de regio Altena: een lokaal platform dat de keten tussen boer, verwerker en consument korter en inzichtelijk maakt.',
    outline: 'Als schoolproject bij Creative Business (BUas) ontwierpen we de digitale identiteit en homepage voor het Living Lab Boer tot Bord Altena. Het doel van het project was om de reis van lokaal geteeld voedsel (zoals regionale sojabonen verwerkt tot tempeh) transparant te visualiseren voor bewoners, zorginstellingen en horeca. Het ontwerp kenmerkt zich door een warme, natuurlijke kleurkeuze en een overzichtelijke ketenpresentatie.',
    outlineNl: 'Als schoolproject bij Creative Business (BUas) ontwierpen we de digitale identiteit en homepage voor het Living Lab Boer tot Bord Altena. Het doel van het project was om de reis van lokaal geteeld voedsel (zoals regionale sojabonen verwerkt tot tempeh) transparant te visualiseren voor bewoners, zorginstellingen en horeca. Het ontwerp kenmerkt zich door een warme, natuurlijke kleurkeuze en een overzichtelijke ketenpresentatie.',
    writtenBy: 'Webdesign · Interface Concept · Typografie · Ketenvisualisatie',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Interface Concept & Webdesign — Dean van Uden e.a. · Opleiding — BUas Creative Business',
    cast: 'Homepage Hero & Ketenstructuur',
    locations: 'Regio Altena & Breda',
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
        characterDetail: 'Homepage Hero · "Van eigen bodem, rechtstreeks naar jouw bord." Heldere navigatie en lokale ketenidentiteit.',
        characterDetailNl: 'Homepage Hero · "Van eigen bodem, rechtstreeks naar jouw bord." Heldere navigatie en lokale ketenidentiteit.',
        alt: 'Lekker van Hier Boer tot Bord Altena website front page',
      },
    ],
  },

  unpluggd: {
    id: 'unpluggd',
    slug: 'unpluggd',
    category: 'design',
    title: 'Unplugg’d Magazine — Editorial Cover Design',
    displayTitle: 'Unplugg’d Magazine',
    year: '2024',
    type: 'Editorial cover & magazine design, BUas',
    typeNl: 'Editorial cover & magazine design, BUas',
    production: 'BUas Creative Business — Eerstejaars magazineproject',
    myRole: 'Editorial Designer & Cover Artist',
    myRoleNl: 'Editorial designer & cover artist',
    cardRole: 'Editorial design',
    cardRoleNl: 'Editorial design',
    tagline: 'When screens fade away. Less is more.',
    taglineNl: 'When screens fade away. Less is more.',
    logline: 'Coverontwerp voor Unplugg’d, ons eerste magazineproject bij Creative Business aan BUas, gericht op digital detox, focus en het doorbreken van constante connectiviteit.',
    loglineNl: 'Coverontwerp voor Unplugg’d, ons eerste magazineproject bij Creative Business aan BUas, gericht op digital detox, focus en het doorbreken van constante connectiviteit.',
    outline: 'Unplugg’d was het eerste magazine dat we ontwikkelden binnen de opleiding Creative Business aan BUas. Het centrale thema was het heroveren van rust in een wereld vol digitale prikkels. Voor de cover koos ik voor een compositie waarin een eenling uitkijkt over de grandeur van Half Dome (Yosemite), gecontrasteerd met een dubbele belichting van oplichtende smartphones in de wolkenlucht. Een quote-cirkel met wereldkampioen honkbal Kalian Sams ("Control what you can control") vormt het ankerpunt van de cover.',
    outlineNl: 'Unplugg’d was het eerste magazine dat we ontwikkelden binnen de opleiding Creative Business aan BUas. Het centrale thema was het heroveren van rust in een wereld vol digitale prikkels. Voor de cover koos ik voor een compositie waarin een eenling uitkijkt over de grandeur van Half Dome (Yosemite), gecontrasteerd met een dubbele belichting van oplichtende smartphones in de wolkenlucht. Een quote-cirkel met wereldkampioen honkbal Kalian Sams ("Control what you can control") vormt het ankerpunt van de cover.',
    writtenBy: 'Cover Design · Typografie · Fotocompositie · Editorial Layout',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Cover & Editorial Design — Dean van Uden · Opleiding — BUas Creative Business',
    cast: 'Cover Spread met Kalian Sams feature',
    locations: 'Breda',
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
        characterDetail: 'Cover Unplugg’d Nr. 1 · Typografie, dubbele belichting en quote-badge van Kalian Sams.',
        characterDetailNl: 'Cover Unplugg’d Nr. 1 · Typografie, dubbele belichting en quote-badge van Kalian Sams.',
        alt: 'Unpluggd magazine cover design',
      },
    ],
  },

  photography: {
    id: 'photography',
    slug: 'sportfotografie',
    category: 'photography',
    title: 'Sportfotografie — Softbal & Honkbal',
    displayTitle: 'Sportfotografie',
    year: '2024–heden',
    type: 'Wedstrijd- & actiefotografie, Oosterhout',
    typeNl: 'Wedstrijd- & actiefotografie, Oosterhout',
    production: 'Sportfotografie & Veldreportages',
    myRole: 'Fotograaf',
    myRoleNl: 'Fotograaf',
    cardRole: 'Fotografie',
    cardRoleNl: 'Fotografie',
    tagline: 'Het juiste moment op het veld, vastgelegd in een honderdste van een seconde.',
    taglineNl: 'Het juiste moment op het veld, vastgelegd in een honderdste van een seconde.',
    logline: 'Wedstrijdfotografie langs de krijtlijnen: actiemomenten, anticipatie en de intense focus van speelsters in het heetst van de strijd.',
    loglineNl: 'Wedstrijdfotografie langs de krijtlijnen: actiemomenten, anticipatie en de intense focus van speelsters in het heetst van de strijd.',
    outline: 'Als sportfotograaf draait het om anticiperen. Weten waar de bal heengaat voordat hij geslagen wordt, de timing van een swing, en de blik van de catcher door het masker. Deze beelden vangen de dynamiek en de fysieke concentratie van softbal en honkbal in het veld.',
    outlineNl: 'Als sportfotograaf draait het om anticiperen. Weten waar de bal heengaat voordat hij geslagen wordt, de timing van een swing, en de blik van de catcher door het masker. Deze beelden vangen de dynamiek en de fysieke concentratie van softbal en honkbal in het veld.',
    writtenBy: 'Wedstrijdfotografie · Actieshots · Portretten · Kleurbewerking',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Fotografie — Dean van Uden · Locaties — Oosterhout & regio',
    cast: 'Speelsters & teams softbal',
    locations: 'Sportpark De Slotbosse Toren, Oosterhout',
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
        characterDetail: 'Focus achter het masker · Portret van de catcher voor de start van de inning onder een dreigende lucht.',
        characterDetailNl: 'Focus achter het masker · Portret van de catcher voor de start van de inning onder een dreigende lucht.',
        alt: 'Softball catcher portret in wedstrijduitrusting',
      },
      {
        id: 'diamond-action',
        image: assetUrl('/assets/projects/photography/action.jpg'),
        characterDetail: 'Het moment van de slag · Slagvrouw in positie, catcher en scheidsrechter gereed op de thuisplaat.',
        characterDetailNl: 'Het moment van de slag · Slagvrouw in positie, catcher en scheidsrechter gereed op de thuisplaat.',
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
