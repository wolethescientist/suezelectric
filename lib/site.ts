/** Single source of truth for the facts that appear in metadata, schema and copy. */

export const SITE_URL = "https://suezelectric.com";

export const COMPANY = {
  legalName: "SuezElectric Limited",
  name: "SuezElectric",
  rc: "1638998",
  parent: "Suez Energy Group",
  email: "support@suezelectric.com",
  phone: "+2349080070070",
  phoneDisplay: "+234 908 007 0070",
  street: "20 Alexandria Crescent, Wuse 2",
  locality: "Abuja",
  region: "FCT",
  postalCode: "904101",
  country: "NG",
  latitude: 9.0765,
  longitude: 7.3986,
  foundingYear: "2020",
  groupFoundingYear: "2012",
} as const;

/**
 * The one delivery figure. It appears in the hero readout, the phone mock, the
 * "how it works" eyebrow, the footer instrument strip and the login plate — quoting
 * four different numbers across those was the fastest way to look unserious.
 * Change it here and it changes everywhere.
 */
export const TOKEN_DELIVERY_SECONDS = 14;
export const TOKEN_DELIVERY_SHORT = `${TOKEN_DELIVERY_SECONDS}s`;
export const TOKEN_DELIVERY_LONG = `${TOKEN_DELIVERY_SECONDS} seconds`;

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/suezelectric_/",
  "https://x.com/suezelectric",
  "https://www.linkedin.com/in/suezelectric-limited/",
  "https://www.facebook.com/suezelectric",
];

/** The eleven distribution companies the platform vends to. */
export const DISCOS = [
  "Abuja — AEDC",
  "Ikeja — IKEDC",
  "Eko — EKEDC",
  "Ibadan — IBEDC",
  "Enugu — EEDC",
  "Kaduna — KAEDCO",
  "Kano — KEDCO",
  "Jos — JEDPLC",
  "Benin — BEDC",
  "Port Harcourt — PHED",
  "Yola — YEDC",
];
