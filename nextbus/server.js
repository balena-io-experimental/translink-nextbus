const http = require('http');

const hostname = '0.0.0.0';
const stop = process.env.BUSSTOP;
const port = 3000;
const apikey = process.env.APIKEY;
const translinkUrl = 'https://api.translink.ca/RTTIAPI/V1/stops/53620/estimates?apiKey=$APIKEY Accept:application/JSON'

function buildTranslinkQuery() {
  const query = 'https://api.translink.ca/RTTIAPI/V1/stops/' + stop + '/estimates?apiKey' + apikey + ' Accept: application/JSON';
  return query;

}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  msg = buildTranslinkQuery();
  res.end(msg);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
