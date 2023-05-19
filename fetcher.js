const fs = require('fs');
const request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const url = process.argv[2];
const file = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    fs.access(file, (error) => {
      if (!error) {
        rl.question('This file already exists. Would you like to continue? (Y/N) ', (answer) => {
          rl.close();
          if (answer !== 'Y') {
            return;
          }

          fs.writeFile(file, body, error => {
            if (error) {
              console.log(error);
            } else {
              console.log(`Downloaded and saved ${body.length} bytes to ${file}.`);
            }
          });
        });
      }
    });
  }
});