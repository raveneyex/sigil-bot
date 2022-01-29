import * as fs from 'fs';

/**
 * Reads a json from file
 * @param {String} filePath full fileName to json to read.
 * @returns parsed json
 */
export function readJSON(filePath) {
  const rawdata = fs.readFileSync(filePath);
  return JSON.parse(rawdata);
}

/**
 * Writes a json to file
 * @param {String} filePath the full fileName to write.
 * @param {JSON} json the json object to write to file
 */
export function writeJSON(filePath, json) {
  const data = JSON.stringify(json, null, 2);
  fs.writeFileSync(filePath, data);
}

/**
 * Reads a media file into base64 encoding
 * @param {String} filePath full fileName to read
 * @returns base64 encoding of media file
 */
export function readMedia(filePath) {
  return fs.readFileSync(filePath, { encoding: 'base64' });
}
