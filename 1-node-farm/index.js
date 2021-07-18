// Enabling file system access by requiring filesystem module
const fs = require('fs');
// Enabling HTTP function by requiring HTTP module
const http = require('http');
// Enabling URL function by requiring URL module
const url = require('url');

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

// Placeholder changer function
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%ORIGIN%}/g, product.from);
    output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    else {
        output = output.replace(/{%NOT_ORGANIC%}/g, '');
    }
    
    return output;
};

// Read the data synchronously
const overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(element => replaceTemplate(card, element)).join('');
        const output = overview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        //console.log(cardsHtml);
        res.end(output);
    }
    // Product page
    else if (pathName === '/product') {
        res.end("This is the PRODUCT.");
    }
    // API
    else if (pathName === '/api') {
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