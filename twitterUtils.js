import Twit from 'twit';
import config from './config.js';

const { twitConfig  } = config;
const Twitter = new Twit(twitConfig);

/**
 * Posts base64 media content to twitter.
 * Calling code should handle the exceptions.
 * @param {b64content} b64content the media content to post, encoded in base 64.
 * @param {String} altText text to add as 'alt_text' metadata to the image.
 * @returns {String} the mediaId that represents this media content in twitter.
 */
async function postMedia(b64content, altText) {
  // Post image
  const mediaResponse = await Twitter.post('media/upload', {
    media_data: b64content
  });
  // Post image  metadata
  const media_id = mediaResponse?.data?.media_id_string;  
  await Twitter.post('media/metadata/create', {
    media_id,
    alt_text: { text: altText }
  });

  console.log('Succesfully posted for', media_id);
  return media_id;
}


/**
 * Posts a twit
 * @param {String} message the message to twit
 * @param {Array<Object>} media an array of { mediaContent, mediaDescription } objects. 
 * Where `mediaContent` is the base64 encoded content of the media to post, 
 * and `mediaDescription` is a string to use as the media alt text.
 */
export async function twit(message, media) {
  try {
    const mediaId = await postMedia(media.sigil, media.intent);
    
    // Post content with image
    const statusResponse = await Twitter.post('statuses/update', {
      status: message,
      media_ids: [ mediaId ]
    });
    // Log success
    const createdAt = statusResponse?.data?.created_at;
    console.log(`Succesfully posted:\n${message}\nat ${createdAt}\n--------`);
    return statusResponse;
  } catch ({ message }) {
    console.error(`Something went wrong: ${message}`);
  }
}



