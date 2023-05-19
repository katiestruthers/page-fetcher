const fs = require('fs');
const request = require('request');
const url = process.argv[2];
const file = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    fs.writeFile(file, body, error => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${file}.`);
      }
    });
  }
});