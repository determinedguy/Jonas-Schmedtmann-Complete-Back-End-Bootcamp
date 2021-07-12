// Enabling file system access by requiring filesystem module
const fs = require('fs');
// Enabling HTTP function by requiring HTTP module
const http = require('http');

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
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end("This is the OVERVIEW.");
    } else if (pathName === '/product') {
        res.end("This is the PRODUCT.");
    } else {
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