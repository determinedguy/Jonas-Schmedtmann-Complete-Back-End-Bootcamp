// Enabling file system access by requiring filesystem module
const fs = require('fs');
// Enabling HTTP function by requiring HTTP module
const http = require('http');
// Enabling URL function by requiring URL module
const url = require('url');

// Enabling slugify for slug
const slugify = require('slugify');

// Require (custom) replaceTemplate module
const replaceTemplate = require('./modules/replaceTemplate');

///////////////////////////////////////////////////////////////////////////////////////////////////
// FILE

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File written!");

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     if (err) return console.log("Error!");

//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, text1) => {
//         console.log(text1);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, text2) => {
//             console.log(text2);

//             fs.writeFile('./txt/final.txt', `${text1}\n${text2}`, 'utf-8', err => {
//                 console.log("Your file has been written.");
//             });
//         });
//     });
// });
// console.log("Please wait...");

///////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER
// Read the data synchronously
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(element => slugify(element.productName, { lower:true }));

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        const cardsHtml = dataObj.map(element => replaceTemplate(templateCard, element)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.end(output);
    }
    // Product page
    else if (pathname === '/product') {
        // Retrieve the product ID from the URL
        const product = dataObj[query.id];

        const output = replaceTemplate(templateProduct, product);

        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.end(output);
    }
    // API
    else if (pathname === '/api') {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        // Send the data in JSON format
        res.end(data);
    }
    // Not Found page
    else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end("<h1>Page not found.</h1>");
    }

    // res.end("Hello from the server!");
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to requests on port 8000...");
});