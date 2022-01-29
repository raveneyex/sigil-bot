import { readJSON, writeJSON } from './fileUtils.js'
import { twit } from './twitterUtils.js';
import { SIGILS_LIST, SPELL, AOA } from './sigilUtils.js'

const PERSISTENCE_FILE = './persistence.json';

const HALF_HOUR = 1000 * 60 * 30;
const HOUR = HALF_HOUR * 2;

function getIndex() {
  let { index } = readJSON(PERSISTENCE_FILE);
  return index;
}

function setIndex(index) {
  let normalizedIndex = index % SIGILS_LIST.length;
  let data = { index: normalizedIndex };
  writeJSON(PERSISTENCE_FILE, data);
}

async function castSigilChoice() {
  let index = getIndex();
  const { intent, sigil } = SIGILS_LIST[index];
  await twit(intent, sigil);
  setIndex(index+1);
}


function castSigils() {
  return new Promise(resolve => {
    const intervalId = setInterval(castSigilChoice, 1000 * 60);
    setTimeout(() => {
      clearInterval(intervalId);
      resolve();
    }, 1000 * 60 * 5);
  });
}

export async function castSpell() {
  try {
    castSigilChoice();
    castSigils();
  }
  catch (error) {
    console.error(`Something went wrong: ${error.message}`);
  }
}

(function run() {
  setTimeout(castSpell, 10000);
})();