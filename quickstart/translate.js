'use strict';

async function main(
  projectId = 'YOUR_PROJECT_ID' // Your GCP Project Id
) {
  // [START translate_quickstart]
  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Instantiates a client
  const translate = new Translate({projectId});

  // The text to translate
  const text = 'Hello, world!';

  // The target language
//   const target = 'ru';
  const target = 'ja';

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}
// [END translate_quickstart]

const args = process.argv.slice(2);
main(...args).catch(console.error);