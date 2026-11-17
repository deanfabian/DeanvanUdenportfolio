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
    lead: string;
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
      backToStory: 'Terug naar overzicht',
    },
    welcome: {
      name: 'Dean van Uden',
      scrollCue: 'scroll omlaag',
      whisper: '“Die is van mij.”',
      comeIn: 'Binnentreden',
    },
    sound: {
      soundOff: 'Geluid uit',
      rainCity: 'Buiten · Regen',
      quietInside: 'Binnen · Stilte',
    },
    portfolio: {
      badge: '№ 01 / ARCHIEF & PRODUCTIE',
      title: 'Geselecteerde projecten',
      subtitle: 'Korte fictiefilms vanuit de opleiding aan BUas en visuele videocontent voor sportclubs in Brabant.',
      filterAll: 'Alle producties',
      filterFilms: 'Fictie & Film (BUas)',
      filterSocial: 'Sport & Social Content',
      viewProject: 'Bekijk productie',
      watchYouTube: 'Bekijk op YouTube',
      viewImdb: 'Bekijk op IMDb',
      credits: 'Credits & Crew',
      stills: 'Scènebeelden',
      loglineLabel: 'Logline',
      outlineLabel: 'Synopsis',
    },
    story: {
      badge: '№ 02 / DOSSIER & WERKWIJZE',
      title: 'Audiovisueel producent met een voorliefde voor fictie en sportdynamiek.',
      subtitle: 'Creative Business (AV) · Breda University of Applied Sciences',
      lead: 'Geen holle concepten, maar strak georganiseerde producties waarin acteurs en crew de ruimte krijgen om raak te schieten.',
      p1: 'Mijn naam is Dean van Uden (21). Aan de Breda University of Applied Sciences (BUas) specialiseer ik me binnen Creative Business in audiovisuele productie en regie. Ik werk het liefst op het snijvlak van droge humor en menselijke eigenaardigheden — van een absurdistische mockumentary over de hobby-horsing topsport (Mustang) tot een beklemmend psychologisch drama rondom een obsessieve vogelaar (CRACKED).',
      p2: 'Als producent ben ik degene die de logistiek van een filmset stroomlijnt: van vroege scriptbesprekingen en casting tot call sheets, draaidag-planning en montage-deadlines. Een overtuigend cinematografisch idee komt pas tot leven wanneer de praktische randvoorwaarden op de set waterdicht geregeld zijn.',
      p3: 'Buiten de studio sta ik langs het gravel voor honkbal- en softbalclub Brabant Twins in Oosterhout. Daar vertaal ik de rauwe wedstrijdspanning, snelle acties en clubcultuur naar directe, ritmische social video’s met een eigen visuele signatuur.',
      stats: {
        role: 'Functie',
        roleVal: 'AV Producent & Content Maker',
        base: 'Standplaats',
        baseVal: 'Breda & Oosterhout, NL',
        focus: 'Vakgebied',
        focusVal: 'Fictieproductie & Sportmedia',
      },
    },
    contact: {
      badge: '№ 03 / CONTACT & SAMENWERKING',
      title: 'Nieuwe productie of samenwerking starten?',
      subtitle: 'Heb je een filmplan, zoek je een producent voor een project of wil je sparren over gerichte videocontent? Stuur direct een bericht of mail naar mijn inbox.',
      emailLabel: 'Rechtstreeks contact',
      copyEmail: 'Kopieer adres',
      copied: 'Gekopieerd',
      locationLabel: 'Werkgebied',
      locationVal: 'Breda, Oosterhout & Noord-Brabant',
      studyLabel: 'Opleiding',
      studyVal: 'BUas Creative Business (AV)',
      form: {
        name: 'Naam',
        namePlaceholder: 'Bijv. Alex de Vries',
        email: 'E-mailadres',
        emailPlaceholder: 'alex@voorbeeld.nl',
        subject: 'Type aanvraag',
        subjectPlaceholder: 'Selecteer een categorie',
        typeFilm: 'Filmproductie / Fictieproject',
        typeSocial: 'Social Video & Sportcontent',
        typeOther: 'Kennismaking / Vrijblijvend contact',
        message: 'Toelichting op het project',
        messagePlaceholder: 'Beschrijf kort het idee, de gewenste periode of het soort productie...',
        send: 'Verstuur aanvraag',
        sending: 'Versturen...',
        successTitle: 'Aanvraag ontvangen',
        successDesc: 'Bedankt voor je bericht. Ik reageer binnen 1 tot 2 werkdagen.',
      },
    },
  },
  en: {
    nav: {
      portfolio: 'Portfolio',
      story: 'Story',
      contact: 'Contact',
      backToPortfolio: 'Back to portfolio',
      backToStory: 'Back to overview',
    },
    welcome: {
      name: 'Dean van Uden',
      scrollCue: 'scroll down',
      whisper: '“This one’s mine.”',
      comeIn: 'Enter',
    },
    sound: {
      soundOff: 'Sound off',
      rainCity: 'Outside · Rain',
      quietInside: 'Inside · Quiet',
    },
    portfolio: {
      badge: '№ 01 / SELECTED ARCHIVE',
      title: 'Selected Productions',
      subtitle: 'Narrative short films produced at BUas, alongside sports visual media in Brabant.',
      filterAll: 'All Productions',
      filterFilms: 'Fiction & Short Films (BUas)',
      filterSocial: 'Sports & Social Content',
      viewProject: 'View Production',
      watchYouTube: 'Watch on YouTube',
      viewImdb: 'View on IMDb',
      credits: 'Credits & Crew',
      stills: 'Production Stills',
      loglineLabel: 'Logline',
      outlineLabel: 'Synopsis',
    },
    story: {
      badge: '№ 02 / DOSSIER & PRACTICE',
      title: 'Audiovisual producer focused on narrative fiction and sports dynamics.',
      subtitle: 'Creative Business (AV) · Breda University of Applied Sciences',
      lead: 'Grounding ambitious creative visions in disciplined, transparent production frameworks.',
      p1: 'My name is Dean van Uden (21). Studying Creative Business with an Audiovisual specialization at BUas in Breda, I produce and direct narrative fiction and branded visual content. I am drawn to authentic human quirks and dry wit — from an absurd mockumentary about the elite hobby-horsing circuit (Mustang) to a tense psychological drama revolving around an isolated birdwatcher (CRACKED).',
      p2: 'As a producer, my responsibility is turning script ambition into reality: managing casting calls, call sheets, budgeting, shooting schedules, and post-production deliverables. The most striking cinematic ideas only succeed when practical production conditions on set are completely airtight.',
      p3: 'Off set, I produce field-level visual content for Brabant Twins, a premier baseball and softball club in Oosterhout. Capturing raw kinetic energy and game-day momentum, I craft fast-paced social video that brings genuine energy to audiences.',
      stats: {
        role: 'Role',
        roleVal: 'AV Producer & Content Creator',
        base: 'Location',
        baseVal: 'Breda & Oosterhout, NL',
        focus: 'Specialization',
        focusVal: 'Fiction Production & Sports Media',
      },
    },
    contact: {
      badge: '№ 03 / INQUIRY & DISPATCH',
      title: 'Initiate a project or collaboration.',
      subtitle: 'Planning an upcoming shoot, need a producer for a narrative project, or looking for compelling sport visual media? Send an inquiry directly below.',
      emailLabel: 'Direct contact',
      copyEmail: 'Copy address',
      copied: 'Copied',
      locationLabel: 'Base region',
      locationVal: 'Breda, Oosterhout & North Brabant',
      studyLabel: 'Education',
      studyVal: 'BUas Creative Business (AV)',
      form: {
        name: 'Name',
        namePlaceholder: 'e.g. Alex Smith',
        email: 'Email address',
        emailPlaceholder: 'alex@example.com',
        subject: 'Inquiry type',
        subjectPlaceholder: 'Select category',
        typeFilm: 'Film Production / Fiction Project',
        typeSocial: 'Social Video & Sports Content',
        typeOther: 'General Inquiry / Coffee',
        message: 'Project details',
        messagePlaceholder: 'Briefly describe your concept, timeline, or how we might collaborate...',
        send: 'Send inquiry',
        sending: 'Sending...',
        successTitle: 'Inquiry received',
        successDesc: 'Thank you for reaching out. I will respond within 1 to 2 business days.',
      },
    },
  },
};
