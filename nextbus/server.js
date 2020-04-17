const got = require('got');
const express = require('express');
const app = express();

// Enable HTML template middleware
app.engine('html', require('ejs').renderFile);

const port = 3000;
const hostname = '0.0.0.0';

const stop = process.env.BUSSTOP;
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


app.get('/', function (req, res) {
  res.render('index.html');
});

});
app.listen(port, () => console.log(`Server running`));
