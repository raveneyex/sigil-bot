const config = {
  twitConfig: {
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    access_token: process.env.TOKEN,
    access_token_secret: process.env.TOKEN_SECRET,
  },
  interval: 3600000,
  intent: 'Del 11 de noviembre de 2021 al 17 de noviembre de 2021 el producto lifecycle de sonatype no presenta errores en sus instancias de produccion y no recibe tiquets de support que requieran ser atendidos por el equipo on-call, liberandome asi para resumir mi trabajo usual como desarrollador frontend',
};
export default config;
