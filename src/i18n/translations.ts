export type Language = 'nl' | 'en';

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
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFilms: string;
    filterSocial: string;
    viewProject: string;
    watchYouTube: string;
    viewImdb: string;
    credits: string;
    stills: string;
    loglineLabel: string;
    outlineLabel: string;
  };
  story: {
    badge: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    stats: {
      role: string;
      roleVal: string;
      base: string;
      baseVal: string;
      focus: string;
      focusVal: string;
    };
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    copyEmail: string;
    copied: string;
    locationLabel: string;
    locationVal: string;
    studyLabel: string;
    studyVal: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      typeFilm: string;
      typeSocial: string;
      typeOther: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      successTitle: string;
      successDesc: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  nl: {
    nav: {
      portfolio: 'Portfolio',
      story: 'Story',
      contact: 'Contact',
      backToPortfolio: 'Terug naar portfolio',
      backToStory: 'Terug naar het verhaal',
    },
    welcome: {
      name: 'Dean van Uden',
      scrollCue: 'scroll',
      whisper: '“Die is van mij.”',
      comeIn: 'Kom binnen.',
    },
    sound: {
      soundOff: 'Geluid uit',
      rainCity: 'Regen · Stad',
      quietInside: 'Stil binnen',
    },
    portfolio: {
      badge: 'Geselecteerd Werk',
      title: 'Portfolio',
      subtitle: 'Audiovisuele producties, korte fictiefilms en gerichte social media visual storytelling.',
      filterAll: 'Alle projecten',
      filterFilms: 'Film & Fictie (BUas)',
      filterSocial: 'Social Media & Content',
      viewProject: 'Bekijk project',
      watchYouTube: 'Bekijk op YouTube',
      viewImdb: 'Bekijk op IMDb',
      credits: 'Credits',
      stills: 'Scènebeelden',
      loglineLabel: 'Logline',
      outlineLabel: 'Synopsis',
    },
    story: {
      badge: 'Achtergrond',
      title: 'Verhalen die niet worden uitgelegd, maar gevoeld.',
      subtitle: 'Creative Business student · AV Producent · Content Maker',
      p1: 'Ik ben Dean van Uden, 21 jaar oud en Creative Business-student aan Breda University of Applied Sciences (BUas), met een duidelijke focus op audiovisuele productie en regie. Of het nu gaat om een absurdistische mockumentary, een psychologische korte film of het vastleggen van de rauwe teamdynamiek op een sportveld: ik zoek altijd naar het personage achter de façade.',
      p2: 'Elk raam in een nachtelijke stad verbergt een volwaardig bestaan — momenten van twijfel, humor, obsessie en toewijding die voorbijgangers zelden te zien krijgen. Als producent creëer ik de omstandigheden en het raamwerk waarin die werelden tot leven kunnen komen, zonder overbodige opsmuk of uitleg.',
      p3: 'Naast filmproducties verzorg ik de social media content en visuele identiteit voor honkbal- en softbalclub Brabant Twins in Oosterhout. Van script en casting tot de hectiek van de draaidag en een strakke post-productie: verhalen bouwen die blijven hangen.',
      stats: {
        role: 'Functie',
        roleVal: 'Producent & Content Maker',
        base: 'Thuisbasis',
        baseVal: 'Breda / Oosterhout',
        focus: 'Specialisatie',
        focusVal: 'AV Productie · BUas',
      },
    },
    contact: {
      badge: 'Samenwerken',
      title: 'Laten we in contact komen.',
      subtitle: 'Heb je een project, een filmplan of wil je sparren over creatieve content? Mijn inbox staat altijd open.',
      emailLabel: 'Directe e-mail',
      copyEmail: 'Kopieer e-mail',
      copied: 'Gekopieerd!',
      locationLabel: 'Locatie',
      locationVal: 'Breda & Oosterhout, Nederland',
      studyLabel: 'Opleiding',
      studyVal: 'BUas Creative Business (AV)',
      form: {
        name: 'Jouw naam',
        namePlaceholder: 'Bijv. Alex de Vries',
        email: 'Jouw e-mailadres',
        emailPlaceholder: 'alex@voorbeeld.nl',
        subject: 'Waar gaat het over?',
        subjectPlaceholder: 'Selecteer een categorie',
        typeFilm: 'Filmproductie / Fictie',
        typeSocial: 'Social Media & Content Creation',
        typeOther: 'Algemene vraag / Sparren',
        message: 'Vertel over jouw idee of vraag',
        messagePlaceholder: 'Beschrijf kort het project, de planning of wat we samen kunnen neerzetten...',
        send: 'Bericht versturen',
        sending: 'Verzenden...',
        successTitle: 'Bericht ontvangen',
        successDesc: 'Bedankt voor je bericht! Ik neem binnen 24–48 uur contact met je op.',
      },
    },
  },
  en: {
    nav: {
      portfolio: 'Portfolio',
      story: 'Story',
      contact: 'Contact',
      backToPortfolio: 'Back to portfolio',
      backToStory: 'Back to the story',
    },
    welcome: {
      name: 'Dean van Uden',
      scrollCue: 'scroll',
      whisper: '“This one’s mine.”',
      comeIn: 'Come in.',
    },
    sound: {
      soundOff: 'Sound Off',
      rainCity: 'Rain · City',
      quietInside: 'Quiet Inside',
    },
    portfolio: {
      badge: 'Selected Work',
      title: 'Portfolio',
      subtitle: 'Audiovisual productions, narrative short films, and high-impact social media visual storytelling.',
      filterAll: 'All projects',
      filterFilms: 'Film & Fiction (BUas)',
      filterSocial: 'Social Media & Content',
      viewProject: 'View project',
      watchYouTube: 'Watch on YouTube',
      viewImdb: 'View on IMDb',
      credits: 'Credits',
      stills: 'Scene Stills',
      loglineLabel: 'Logline',
      outlineLabel: 'Outline',
    },
    story: {
      badge: 'Background',
      title: "Stories that aren't explained, but felt.",
      subtitle: 'Creative Business student · AV Producer · Content Creator',
      p1: "I'm Dean van Uden, 21 years old and a Creative Business student at Breda University of Applied Sciences (BUas), specializing in audiovisual production. Whether producing an observant mockumentary, a psychological narrative, or capturing the kinetic adrenaline of a ballgame: I am always drawn to the character behind the facade.",
      p2: 'Every window in a nighttime high-rise shelters a vivid life — private moments of ambition, obsession, vulnerability, and craft that strangers rarely enter. As a producer, my role is to shape the environment and framework where those worlds come alive with restraint.',
      p3: 'Alongside narrative films, I manage social media presence and visual storytelling for baseball & softball club Brabant Twins in Oosterhout. From initial pitch and casting through production management and final master: crafting stories that endure.',
      stats: {
        role: 'Role',
        roleVal: 'Producer & Content Creator',
        base: 'Location',
        baseVal: 'Breda / Oosterhout, NL',
        focus: 'Specialization',
        focusVal: 'AV Production · BUas',
      },
    },
    contact: {
      badge: 'Collaboration',
      title: "Let's connect.",
      subtitle: 'Have a production concept, an upcoming film shoot, or want to discuss creative visual content? Feel free to reach out.',
      emailLabel: 'Direct email',
      copyEmail: 'Copy email',
      copied: 'Copied!',
      locationLabel: 'Location',
      locationVal: 'Breda & Oosterhout, Netherlands',
      studyLabel: 'Education',
      studyVal: 'BUas Creative Business (AV)',
      form: {
        name: 'Your name',
        namePlaceholder: 'e.g. Alex Smith',
        email: 'Your email address',
        emailPlaceholder: 'alex@example.com',
        subject: 'Project inquiry',
        subjectPlaceholder: 'Select a project category',
        typeFilm: 'Film Production / Fiction',
        typeSocial: 'Social Media & Content Creation',
        typeOther: 'General inquiry / Coffee',
        message: 'Tell me about your idea or project',
        messagePlaceholder: 'Briefly describe your concept, timeline, or how we might collaborate...',
        send: 'Send message',
        sending: 'Sending...',
        successTitle: 'Message received',
        successDesc: 'Thank you for reaching out! I will get back to you within 24–48 hours.',
      },
    },
  },
};
