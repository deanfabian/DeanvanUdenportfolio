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
    type: 'Mockumentary · Comedy',
    typeNl: 'Mockumentary · Komedie',
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
        characterDetail: 'Cal Dekker. Never trains without his inhaler.',
        characterDetailNl: 'Cal Dekker. Traint nooit zonder zijn inhalator.',
        alt: 'Cal Dekker preparing before a match',
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
    type: 'Short movie · Drama, dark comedy',
    typeNl: 'Korte film · Drama, zwarte komedie',
    production: 'Cannet Chews Productions — BUas PRO3 Audio Visual Production',
    myRole: 'Executive Producer · Co-writer',
    myRoleNl: 'Executive Producer · Co-scenarist',
    cardRole: 'Executive Producer',
    cardRoleNl: 'Executive Producer',
    logline: 'A perfectionist chef, renowned for his flawless dishes, must crack an egg perfectly to complete the greatest dish of his career. But when every attempt results in tiny shell fragments ruining the yolk, he embarks on a hilariously obsessive journey of late-night experiments and bizarre techniques to overcome his culinary curse.',
    loglineNl: 'Een perfectionistische chef-kok, befaamd om zijn vlekkeloze creaties, moet een ei foutloos breken om het meesterwerk van zijn carrière te voltooien. Wanneer elke poging strandt in minuscule eierschalen die de dooier verpesten, raakt hij verwikkeld in een koortsachtige nachtelijke zoektocht vol bizarre technieken om zijn culinaire vloek te bezweren.',
    outline: 'Renowned for his flawless culinary creations, Chef Victor hides a humiliating secret: he can’t crack an egg without breaking the yolk or getting the shell in the egg. His secret is safe behind kitchen doors, until he enters a high-stakes, televised cooking competition where shortcuts aren’t allowed. As the pressure mounts, Victor spirals into obsession, desperate to conquer the one skill that threatens his reputation. On live television, with everything on the line, he fails, but near the end he chooses to try again. In a single, perfect crack, he finally succeeds.',
    outlineNl: 'Beroemd om zijn verfijnde gerechten verbergt chef Victor een gênant geheim: hij kan geen ei breken zonder dat de dooier scheurt of er schilfers in terechtkomen. Zijn geheim blijft binnenskamers, totdat hij meedoet aan een prestigieuze kookwedstrijd op live televisie waar shortcuts verboden zijn. Terwijl de camera’s draaien en de druk toeneemt, verliest hij de controle — om uiteindelijk, met alles op het spel, in één feilloze breekbeweging zijn perfectie te heroveren.',
    writtenBy: 'Dean van Uden, Samin Dizdar, Jada Vredebregt',
    writtenByLabel: 'Originally written by',
    writtenByLabelNl: 'Oorspronkelijk scenario door',
    crew: 'Director — Gilde Bugaityte · Executive Producer — Dean van Uden · DOP — Leticija Mazulyte · Editor — Samin Dizdar · Production Designer — Jada Vredebregt · Audio — Keira van de Vliert',
    cast: 'Floris van der Waals (Victor) · Angel Reedijk (Elena) · Federico Petrini (Chef 1) · Nora Naji (Colleague 1)',
    locations: 'Oosterhout · The Palm, Breda · De Rooi Pannen, Breda · Etten-Leur',
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
    title: 'Brabant Twins — Social Media & Content Creatie',
    displayTitle: 'Brabant Twins',
    year: '2024–heden',
    type: 'Social Media · Content Creatie',
    typeNl: 'Social Media · Content Creatie & Sport Branding',
    production: 'Brabant Twins Honkbal & Softbal — Oosterhout',
    myRole: 'Content Creator · Social Media Manager',
    myRoleNl: 'Content Creator · Social Media Manager',
    cardRole: 'Content Creator',
    cardRoleNl: 'Content Creator',
    tagline: 'Capturing the raw momentum of European baseball.',
    taglineNl: 'De rauwe dynamiek en passie van honkbal vastgelegd.',
    logline: 'Voor honkbal- en softbalvereniging Brabant Twins in Oosterhout verzorg ik de visuele identiteit op social media: van wedstrijddag-visuals en line-ups tot dynamische video-reels en sfeerimpressies langs het veld.',
    loglineNl: 'Voor honkbal- en softbalvereniging Brabant Twins in Oosterhout verzorg ik de visuele identiteit op social media: van wedstrijddag-visuals en line-ups tot dynamische video-reels en sfeerimpressies langs het veld.',
    outline: 'Als content creator voor Brabant Twins ligt de focus op het vertellen van de verhalen binnen de club. Niet alleen de stand op het scorebord, maar de spanning in de dug-out, de voorbereiding van de werpers en de energie van het team. Door een consistente, professionele beeldtaal en snelle publicatie rondom wedstrijddagen brengen we de sport tot leven voor fans, spelers en de lokale gemeenschap.',
    outlineNl: 'Als content creator voor Brabant Twins ligt de focus op het vertellen van de verhalen binnen de club. Niet alleen de stand op het scorebord, maar de spanning in de dug-out, de voorbereiding van de werpers en de energie van het team. Door een consistente, professionele beeldtaal en snelle publicatie rondom wedstrijddagen brengen we de sport tot leven voor fans, spelers en de lokale gemeenschap.',
    writtenBy: 'Visual Branding · Wedstrijddag Content · Instagram Reels · Fotografie',
    writtenByLabel: 'Disciplines',
    writtenByLabelNl: 'Werkzaamheden',
    crew: 'Content Creatie & Strategie — Dean van Uden · Club & Organisatie — Brabant Twins Oosterhout',
    cast: 'Hoofdklasse & Eerste Klasse Honkbal & Softbal Teams',
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
};
