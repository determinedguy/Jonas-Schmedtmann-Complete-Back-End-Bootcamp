// Enabling file system access by requiring filesystem module
const fs = require('fs');

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File written!");

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    if (err) return console.log("Error!");
    
    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, text1) => {
        console.log(text1);
        fs.readFile('./txt/append.txt', 'utf-8', (err, text2) => {
            console.log(text2);

            fs.writeFile('./txt/final.txt', `${text1}\n${text2}`, 'utf-8', err => {
                console.log("Your file has been written.");
            });
        });
    });
});
console.log("Please wait...");