const http = require('http');
const got = require('got');

const hostname = '0.0.0.0';
const stop = process.env.BUSSTOP;
const port = 3000;
const apikey = process.env.APIKEY;

function buildTranslinkQuery() {
  const query = 'https://api.translink.ca/RTTIAPI/V1/stops/' + stop + '/estimates?apiKey=' + apikey
  return query;

}

console.log('Hello, world!');

(async () => {
  try {
    req = buildTranslinkQuery()
    console.log(req);
    response = await got(req, {
      headers: {
	'content-type': 'application/json'
      }
    });
    data = JSON.parse(response.body);
    console.log(response.body);
    console.log(data);
  } catch (error) {
    console.log(error.response.body);
  }
})();


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // res.write('Hello, world!');
  res.write(data);
  res.end();
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
