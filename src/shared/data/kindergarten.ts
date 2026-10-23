/**
 * Confirmed facts about the kindergarten. Everything on the site is built from this file
 * and the dictionaries in `shared/i18n` — nothing else should be invented
 * (no prices, schedules, extra classes, teachers' titles or programmes).
 */

export const kindergarten = {
  brand: "Улыбка",
  legalName: "ТОО Детский сад «Улыбка»",
  ages: { from: 2, to: 5 },
  groupsCount: 4,
  meals: 4,
  hours: { opens: "07:30", closes: "18:00" },
  phone: { display: "+7 707 795 91 90", tel: "+77077959190" },
  whatsappUrl: "https://wa.me/77077959190",
  instagram: {
    handle: "@sadik_ulybka",
    url: "https://www.instagram.com/sadik_ulybka/",
  },
  /**
   * «Документы»: the documents live in a shared Google Drive folder, the site only links to it.
   * Paste the folder's share link here (Drive → Share → "Anyone with the link").
   * While it is empty, no button is rendered — only a calm "the link will appear soon" note.
   */
  documents: {
    driveUrl: "",
  },
  /**
   * 2GIS organisation card «Улыбка, детский сад, ТОО Улыбка» — Болашак улица, 12б, с. Кайназар.
   * The point is 2GIS's own position of that card (checked against the card's address), not hand-picked.
   */
  twoGis: {
    firmId: "70000001087740923",
    lat: 43.369123,
    lng: 77.301594,
  },
} as const;

/** The four groups. Names are proper names and stay the same in every language. */
export const groups = [
  { id: "stars", name: "Звёздочки", age: 2, motif: "stars" },
  { id: "rays", name: "Лучики", age: 3, motif: "sun" },
  { id: "why", name: "Почемучки", age: 4, motif: "questions" },
  { id: "umka", name: "Умка", age: 5, motif: "bear" },
] as const;
export type GroupId = (typeof groups)[number]["id"];

const { twoGis } = kindergarten;

export const links = {
  tel: `tel:${kindergarten.phone.tel}`,
  whatsapp: kindergarten.whatsappUrl,
  instagram: kindergarten.instagram.url,
  twoGisCard: `https://2gis.kz/almaty/firm/${twoGis.firmId}`,
  /** Keyless 2GIS static map with a marker on the kindergarten. */
  twoGisStatic: (w: number, h: number, zoom = 16) =>
    `https://static.maps.2gis.com/1.0?zoom=${zoom}&size=${w},${h}&markers=${twoGis.lng},${twoGis.lat}`,
} as const;

/** Section ids, shared by both layouts so anchors survive switching between them. */
export const sectionIds = ["home", "about", "advantages", "groups", "activities", "gallery", "documents", "contacts"] as const;
export type SectionId = (typeof sectionIds)[number];

/** Header navigation (order matters). */
export const navSections = ["about", "groups", "activities", "gallery", "documents", "contacts"] as const satisfies readonly SectionId[];
