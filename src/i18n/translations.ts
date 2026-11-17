export type Language = 'nl' | 'en';

export interface Chapter {
  title?: string;
  lines: string[];
}

export interface Translations {
  nav: {
    portfolio: string;
    story: string;
    contact: string;
    backToPortfolio: string;
    backToStory: string;
  };
  welcome: {
    name: string;
    scrollCue: string;
    whisper: string;
    comeIn: string;
  };
  sound: {
    soundOff: string;
    rainCity: string;
    quietInside: string;
  };
  portfolio: {
    title: string;
    filterAll: string;
    filterFilms: string;
    filterSocial: string;
    filterDesign: string;
    filterPhotography: string;
    watchYouTube: string;
    viewImdb: string;
    credits: string;
    stills: string;
    loglineLabel: string;
    outlineLabel: string;
  };
  story: {
    opening: {
      lines: string[];
    };
    ch1: {
      title: string;
      p1: string[];
      p2: string;
      p3: string;
      links: {
        mustang: string;
        cracked: string;
      };
    };
    ch2: {
      title: string;
      p1: string;
      p2: string;
      p3: string;
      links: {
        twins: string;
        throwersLab: string;
      };
    };
    ch3: {
      title: string;
      p1: string;
      p2: string;
      p3: string;
      p4: string;
    };
    ch4: {
      title: string;
      p1: string;
      p2: string;
      p3: string;
      linkMail: string;
    };
  };
  contact: {
    title: string;
    subtext: string;
    copyEmail: string;
    copied: string;
    openMail: string;
  };
}

export const translations: Record<Language, Translations> = {
  nl: {
    nav: {
      portfolio: 'Portfolio',
      story: 'Story',
      contact: 'Contact',
      backToPortfolio: 'Terug naar portfolio',
      backToStory: 'Terug naar story',
    },
    welcome: {
      name: 'Dean van Uden',
      scrollCue: 'scroll',
      whisper: '“Die is van mij.”',
      comeIn: 'Kom binnen.',
    },
    sound: {
      soundOff: 'Geluid uit',
      rainCity: 'Buiten · Regen',
      quietInside: 'Binnen · Stilte',
    },
    portfolio: {
      title: 'Films en content.',
      filterAll: 'Alle',
      filterFilms: 'Film & Fictie',
      filterSocial: 'Social Media & Content',
      filterDesign: 'Graphic Design',
      filterPhotography: 'Fotografie',
      watchYouTube: 'Bekijk op YouTube',
      viewImdb: 'Bekijk op IMDb',
      credits: 'Credits & Crew',
      stills: 'Scènebeelden',
      loglineLabel: 'Logline',
      outlineLabel: 'Synopsis',
    },
    story: {
      opening: {
        lines: [
          'Je liep langs honderd ramen om hier te komen.',
          'Achter elk ervan zat iemand.',
          'Dit is wat er achter het mijne zit.',
        ],
      },
      ch1: {
        title: 'I. Het kader',
        p1: [
          'Een man die gelooft dat een houten stok het beste paard ter wereld is.',
          'Een kok die alles kan, behalve een ei breken.',
        ],
        p2: 'Op papier zijn het komedies. Op de set zag ik acteurs het moment vinden waarop hun personage ophield een grap te zijn en iemand werd.',
        p3: 'Ik produceerde ze, als student Creative Business aan BUas. Locaties, cast, planning, de draaidag. Alles wat je niet ziet, zodat je alleen het verhaal ziet.',
        links: {
          mustang: 'Mustang →',
          cracked: 'CRACKED →',
        },
      },
      ch2: {
        title: 'II. De feed',
        p1: 'Een clubpagina heeft geen budget en geen tv-ploeg. Wel elke week mensen met een verhaal dat niemand anders vertelt.',
        p2: 'Voor Brabant Twins in Oosterhout maak ik de social media. Voor The Throwers Lab, een ontwikkelingsprogramma voor jonge werpers dat ik samen met een bewegingswetenschapper run, doe ik alles achter de schermen: content, marketing, werving en financiën.',
        p3: 'Het werk is hetzelfde als op een set. Iemand laten zien die je anders voorbij was gescrold.',
        links: {
          twins: 'Brabant Twins →',
          throwersLab: 'The Throwers Lab →',
        },
      },
      ch3: {
        title: 'III. Buiten beeld',
        p1: 'Als ik geen camera vasthoud, sta ik meestal op een veld.',
        p2: 'Ik speel in Heren 2 van Brabant Twins. Als hoofdcoach bij Brabant United leid ik talenten onder de 16 uit Brabant op naar en tijdens het NK Little League: spelers scouten en werven, trainingen opzetten, het hele traject regelen. Bij Bixie zet ik winterscholen, trainingen en zomerkampen op voor honk- en softballers, en help ik ze organiseren en uitvoeren.',
        p3: 'En ik bouw Beyond Bases, een merk voor Europese honkballers dat begon als kleding en draait om wat er niet in een statline staat: hoe het met de speler zelf gaat.',
        p4: 'Het is ondernemend werk. Het leerde me plannen, mensen bij elkaar brengen en iets neerzetten dat er eerst niet was. Precies wat een productie ook vraagt.',
      },
      ch4: {
        title: 'IV. Het volgende raam',
        p1: 'Ik zoek mijn volgende kamer.',
        p2: 'Een productie, een mediateam, een kanaal dat verhalen wil vertellen over mensen die je anders voorbij zou lopen.',
        p3: 'Ergens met veel ramen.',
        linkMail: 'Mail me →',
      },
    },
    contact: {
      title: 'Mail me.',
      subtext: 'Over een stage, een productie of content.',
      copyEmail: 'Kopieer',
      copied: 'Gekopieerd',
      openMail: 'Open mail',
    },
  },
  en: {
    nav: {
      portfolio: 'Portfolio',
      story: 'Story',
      contact: 'Contact',
      backToPortfolio: 'Back to portfolio',
      backToStory: 'Back to story',
    },
    welcome: {
      name: 'Dean van Uden',
      scrollCue: 'scroll',
      whisper: '“This one’s mine.”',
      comeIn: 'Come in.',
    },
    sound: {
      soundOff: 'Sound off',
      rainCity: 'Outside · Rain',
      quietInside: 'Inside · Quiet',
    },
    portfolio: {
      title: 'Films and content.',
      filterAll: 'All',
      filterFilms: 'Film & Fiction',
      filterSocial: 'Social Media & Content',
      filterDesign: 'Graphic Design',
      filterPhotography: 'Photography',
      watchYouTube: 'Watch on YouTube',
      viewImdb: 'View on IMDb',
      credits: 'Credits & Crew',
      stills: 'Production Stills',
      loglineLabel: 'Logline',
      outlineLabel: 'Synopsis',
    },
    story: {
      opening: {
        lines: [
          'You walked past a hundred windows to get here.',
          'Behind each one sat someone.',
          'This is what is behind mine.',
        ],
      },
      ch1: {
        title: 'I. The frame',
        p1: [
          'A man who believes a wooden stick is the best horse in the world.',
          'A chef who can do anything, except break an egg.',
        ],
        p2: 'On paper, they are comedies. On set, I saw actors find the moment their character stopped being a joke and became someone.',
        p3: 'I produced them, as a Creative Business student at BUas. Locations, cast, planning, the shoot day. Everything you don’t see, so you only see the story.',
        links: {
          mustang: 'Mustang →',
          cracked: 'CRACKED →',
        },
      },
      ch2: {
        title: 'II. The feed',
        p1: 'A club page has no budget and no TV crew. But every week, people with a story no one else tells.',
        p2: 'For Brabant Twins in Oosterhout, I make the social media. For The Throwers Lab, a development program for young pitchers that I run together with a sports scientist, I do everything behind the scenes: content, marketing, recruitment and finances.',
        p3: 'The work is the same as on a set. Showing someone you would have otherwise scrolled past.',
        links: {
          twins: 'Brabant Twins →',
          throwersLab: 'The Throwers Lab →',
        },
      },
      ch3: {
        title: 'III. Off screen',
        p1: 'When I’m not holding a camera, I’m usually on a field.',
        p2: 'I play in Heren 2 of Brabant Twins. As head coach at Brabant United, I train U16 talents from Brabant toward and during the Dutch Little League Championship: scouting and recruiting players, setting up practices, managing the entire trajectory. At Bixie, I set up winter schools, training sessions and summer camps for baseball and softball players, and help organize and run them.',
        p3: 'And I’m building Beyond Bases, a brand for European baseball players that started as apparel and revolves around what isn’t in a statline: how the player themselves is doing.',
        p4: 'It is entrepreneurial work. It taught me to plan, bring people together and build something that wasn\'t there before. Exactly what a production asks for too.',
      },
      ch4: {
        title: 'IV. The next window',
        p1: 'I am looking for my next room.',
        p2: 'A production, a media team, a channel that wants to tell stories about people you would otherwise walk past.',
        p3: 'Somewhere with a lot of windows.',
        linkMail: 'Mail me →',
      },
    },
    contact: {
      title: 'Mail me.',
      subtext: 'About an internship, a production, or content.',
      copyEmail: 'Copy',
      copied: 'Copied',
      openMail: 'Open mail',
    },
  },
};
