import { assetUrl } from './config';

export interface ProjectStill {
  id: string;
  image: string;
  characterDetail: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
  workingTitle?: string;
  year: string;
  type: string;
  production: string;
  myRole: string;
  cardRole: string;
  logline: string;
  tagline?: string;
  outline: string;
  writtenBy: string;
  writtenByLabel?: string;
  crew: string;
  cast: string;
  locations: string;
  shot?: string;
  links: {
    youtube: string;
    imdb?: string;
  };
  embedUrl: string;
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
    title: 'Mustang (working title: The Mustang)',
    displayTitle: 'Mustang',
    workingTitle: 'The Mustang',
    year: '2026',
    type: 'Mockumentary · Comedy',
    production: 'KennethChews Film Productions — BUas student production (Creative Business, AV specialization)',
    myRole: 'Producer · Casting · Co-writer',
    cardRole: 'Producer',
    logline: '“Mustang” follows Cal “The Mustang” Dekker, a delusional man in his 30s who treats professional hobby horsing with the intensity of elite sport. After a doping scandal involving his stick horse, he attempts redemption at the World Cup in Finland, only to confront his estranged mother and a shocking family revelation.',
    tagline: 'Serious actors for an unserious world.',
    outline: 'The Mustang is a mockumentary sports comedy that follows our main character, Cal Dekker. He is a self-declared hobby-horser who believes he is the best “horser” alive, shown through interviews, archival footage and documentary-style scenes. The film shows how obsessed Cal is with his sport and how complicated his relationship is with his father and trainer, Erik. The story switches between past and present: Cal’s childhood, his rise to fame in the hobby-horsing world, and the scandal that threatens his reputation.',
    writtenBy: 'Sten van der Walle, Dean van Uden, Faye van Calck, Tristan van der Put, Younesse Hoek',
    writtenByLabel: 'Written by',
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
        alt: 'Erik Dekker with his laminated training schedule',
      },
      {
        id: 'cal',
        image: assetUrl('/assets/projects/mustang/still-2.jpg'),
        characterDetail: 'Cal Dekker. Never trains without his inhaler.',
        alt: 'Cal Dekker preparing before a match',
      },
      {
        id: 'gallus',
        image: assetUrl('/assets/projects/mustang/still-3.jpg'),
        characterDetail: 'Gallus Maximus. Listens to classical music in his stable.',
        alt: 'Gallus Maximus stick horse in stable',
      },
      {
        id: 'julia',
        image: assetUrl('/assets/projects/mustang/still-4.jpg'),
        characterDetail: 'Julia Al-Mamoet, 13. The next generation.',
        alt: 'Julia Al-Mamoet on the junior obstacle course',
      },
    ],
  },

  cracked: {
    id: 'cracked',
    slug: 'cracked',
    title: 'CRACKED',
    displayTitle: 'CRACKED',
    year: '2025',
    type: 'Short movie · Drama, dark comedy',
    production: 'Cannet Chews Productions — BUas PRO3 Audio Visual Production',
    myRole: 'Executive Producer · Co-writer',
    cardRole: 'Executive Producer',
    logline: 'A perfectionist chef, renowned for his flawless dishes, must crack an egg perfectly to complete the greatest dish of his career. But when every attempt results in tiny shell fragments ruining the yolk, he embarks on a hilariously obsessive journey of late-night experiments and bizarre techniques to overcome his culinary curse.',
    outline: 'Renowned for his flawless culinary creations, Chef Victor hides a humiliating secret: he can’t crack an egg without breaking the yolk or getting the shell in the egg. His secret is safe behind kitchen doors, until he enters a high-stakes, televised cooking competition where shortcuts aren’t allowed. As the pressure mounts, Victor spirals into obsession, desperate to conquer the one skill that threatens his reputation. On live television, with everything on the line, he fails, but near the end he chooses to try again. In a single, perfect crack, he finally succeeds.',
    writtenBy: 'Dean van Uden, Samin Dizdar, Jada Vredebregt',
    writtenByLabel: 'Originally written by',
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
        alt: 'Victor in the kitchen',
      },
      {
        id: 'elena',
        image: assetUrl('/assets/projects/cracked/still-2.jpg'),
        characterDetail: 'Elena, photographer. Raised to see failure as growth.',
        alt: 'Elena with camera',
      },
      {
        id: 'presenter',
        image: assetUrl('/assets/projects/cracked/still-3.jpg'),
        characterDetail: 'The Presenter. Used to be a chef himself.',
        alt: 'The televised cooking show presenter',
      },
    ],
  },
};
