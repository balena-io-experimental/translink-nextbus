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

async function makeTranslinkQuery() {
  try {
    req = buildTranslinkQuery()
    console.log(req);
    response = await got(req, {
      headers: {
	'content-type': 'application/json'
      }
    });
    data = JSON.parse(response.body);
    console.log('Got a response!')
    // console.log(response.body);
    // console.log(data);
  } catch (error) {
    console.log(error.response.body);
  }
}

console.log('Hello, world!');

makeTranslinkQuery();

app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/', function (req, res) {
  makeTranslinkQuery();
  res.render('index.html');
});
app.listen(port, () => console.log(`Server running`));
