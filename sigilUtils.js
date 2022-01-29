import { mantrick } from 'mantrick';
import { readMedia } from './fileUtils.js';

/**
 * Reads a SigilDefinition and returns the loaded sigil image and the transformed intent.
 * A SigilDefinition is defined as an object of shape { sigil: FileName, intent: String }
 * @param {SigilDefinition} sigilDefinition definition to load.
 * @returns an object of shape { sigil: base64MediaContent, intent: String }
 */
function parseSigilDefinition({ sigil, intent }) {
  const parsedSigil = {
    sigil: readMedia(sigil),
    intent: mantrick(intent)
  };
  return parsedSigil;
}

// SigilDefinition objects
const HEALTH_SIGIL = {
  sigil: './sigils/Health_Sigil.png',
  intent: 'I am healthy — Free of sickness and pain.'
};

const ART_SIGIL = {
  sigil: './sigils/Art_Sigil.png',
  intent: 'I am am artist — Creative and inspired.',
};

const WEALTH_SIGIL = {
  sigil: './sigils/Wealth_Sigil.png',
  intent: 'I am wealthy — Vast wealth keeps coming to me.',
};

const DISCIPLINE_SIGIL = {
  sigil: './sigils/Discipline_Sigil.png',
  intent: 'I am disciplined — Focused and capable of achieving any goal.'
};

const AOA_SIGIL = {
  sigil: './sigils/AOA_Sigil.png',
  intent: 'I AM POWERFUL — My will is law.'
};

const ANIMATED_SPELL = {
  sigil: './sigils/Spell.gif',
  intent: 'I AM POWERFUL — LET ITBE AS I WILL IT.'
};

// Exportable sigils
export const HEALTH = parseSigilDefinition(HEALTH_SIGIL);

export const WEALTH = parseSigilDefinition(WEALTH_SIGIL);

export const ART = parseSigilDefinition(ART_SIGIL);

export const DISCIPLINE = parseSigilDefinition(DISCIPLINE_SIGIL);

export const AOA = parseSigilDefinition(AOA_SIGIL);

export const SPELL = parseSigilDefinition(ANIMATED_SPELL);

export const SIGILS_LIST = [HEALTH, WEALTH, DISCIPLINE, ART];
