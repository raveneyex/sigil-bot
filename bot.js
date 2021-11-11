import * as fs from 'fs';
import Twit from 'twit';
import { mantrick } from 'mantrick';

import config from './config.js';

const { twitConfig, interval, intent } = config;
const Twitter = new Twit(twitConfig);

const b64content = fs.readFileSync('./sigil.jpg', { encoding: 'base64' });

async function cast() {
  try {
    // Generate content text
    const mantra = mantrick(intent);
    console.log(`mantra: ${mantra}`);
    // Post image
    const mediaResponse = await Twitter.post('media/upload', {
      media_data: b64content
    });
    // console.log('media response', JSON.stringify(mediaResponse));
    // Post image  metadata
    const media_id = mediaResponse?.data?.media_id_string;
    await Twitter.post('media/metadata/create', {
      media_id,
      alt_text: {
        text: mantra
      }
    });
    // Post content with image
    const statusResponse = await Twitter.post('statuses/update', {
      status: mantra,
      media_ids: [ media_id ]
    });;
    // Log success
    const createdAt = statusResponse?.data?.created_at;
    console.log(`Succesfully posted:\n${mantra}\nat ${createdAt}\n--------`);
  } catch ({ message }) {
    console.error(`Something went wrong: ${message}`);
  }
}

(function run() {
  cast();
  setInterval(cast, interval);
})();
