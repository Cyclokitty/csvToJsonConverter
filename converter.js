const fs = require('fs');

module.exports = {
  converter: function(path) {
    var fileContent;
    return new Promise(function(resolve) {
      fileContent = fs.readFileSync(path, {encoding: 'utf8'});
      resolve(fileContent);
    })
    .then(function(fileContent) {
      let lines = fileContent.toString().trim().split('\r\n');
      let result = [];
      let headers = lines[0].match(/("[^"]+"|[^,]+)/g);

      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentLine = lines[i].match(/("[^"]+"|[^,]+)/g);
       // currentLine.toString().replace(/\"|"\+/g, '');
        currentLine.toString().replace(/\\"/g, '"');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        // console.log(obj);
        result.push(obj);

      }
      return result;
    })
    .then(function(result) {
      fs.writeFile('cats.json', JSON.stringify(result).replace(/\\"/g, ''), function(err) {
        if (err) {
          console.log('This is the .then writeFile error: ' + err);
        }
        else {
          console.log('Your json file is done.');
          return result;
        }
      });
    })
    .catch(function(err) {
      console.log("this is the catch err: " + err);
    });
  }
}
