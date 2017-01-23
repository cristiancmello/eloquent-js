const Promise = require('promise');
const fs = require('fs');

const readFile = Promise.denodeify(fs.readFile);

readFile('file.txt', 'utf-8').then(function(content){
    console.log('Content:',content);
}, function(error){
    console.log('Falha ao ler o arquivo:',error);
});