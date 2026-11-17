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
  category: 'film' | 'social';
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
    previewVideo: string;
    previewVideoWebm: string;
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
      stillImage: assetUrl('/assets/projects/throwers-lab/hero.jpg'),
      previewVideo: assetUrl('/assets/projects/throwers-lab/preview.mp4'),
      previewVideoWebm: assetUrl('/assets/projects/throwers-lab/preview.webm'),
    },
    stills: [
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
};

// Aliases for convenience
PROJECTS['the-throwers-lab'] = PROJECTS['throwers-lab'];
PROJECTS.throwersLab = PROJECTS['throwers-lab'];
