const http = require('http');
const request = require('requests');

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
    query = buildTranslinkQuery();
    request(query, { 'json': 'true' }, (err, res, body) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        console.log(body.url);
        res.end(body.url);
        console.log(body.explanation);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
