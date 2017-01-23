# Node.js

## O comando `node`
O Node.js disponibiliza um comando para executar script em JS chamado `node`. É possível chamá-lo para interagir
com um interpretador.

### `process.exit()`
Finaliza a aplicação. Retorna 0 caso foi executada com sucesso e diferente de 0 se houve falha.

```js
"use strict";

console.log('Hello, World!');

process.exit(0); // saída com êxito
```

### `process.argv`
Obtém um array com os parâmetros passados pela linha de comando.

```js
"use strict";

console.log(process.argv);

process.exit(0);
```

```bash
node script.js arg1 arg2

# Saída
# [ '/home/../node/v6.9.4/bin/node',
#   '/home/../eloquent-js/script.js',
#   'arg1',
#   'arg2' ]
```

## Exportação de módulo
A seguir, será exemplificado a exportação de um módulo chamado `uppercase` para deixar strings
em maiúscula.

Crie um arquivo chamado `uppercase.js` e coloque o código:

```js
"use strict";

module.exports = function(string){
    return string.toUpperCase();
};
```

Crie um outro arquivo chamado `main.js` e coloque:

```js
"use strict";

const uppercase = require("./uppercase");

console.log(uppercase(process.argv[2]));
```

No terminal, passe:

```bash
node script.js lowerCamelCase

# Saída
# LOWERCAMELCASE
```

## Instalação de pacote com NPM
Como exemplo, será feita a instalação de um pacote chamado `figlet`, que traz a funcionalidade de converter
texto em ASCII Art.

```bash
npm install figlet
```

Em seguida, percebe-se a criação de uma pasta chamado `node_modules`, contendo os módulos instalados com o NPM.

## O Módulo `fs` (File System)
Um dos módulos mais comuns é o `fs`, que fornece funcionalidades para manipulação de sistema de arquivo.

### Ler arquivo (`readFile()`)
```js
"use strict";

const fs = require('fs');

fs.readFile('file.txt', 'utf-8', function(error, data){
    if (error)
        throw error;
        
    console.log('Conteúdo do arquivo:', data);
});
```

### Ler arquivo sem formatação UTF-8
Se quiser ler um arquivo byte-a-byte, a não-especificação de codificação pode auxiliar nisso.

```js
"use strict";

const fs = require('fs');

fs.readFile('file.txt', function(error, buffer){
    if (error)
        throw error;
    
    console.log(`Comprimento do arquivo: ${buffer.length} bytes`);
    console.log(`O primeiro byte: ${buffer[0]}`);
});
```

## Escrever arquivo (`writeFile()`)

```js
"use strict";

const fs = require('fs');

fs.writeFile('file.txt', 'Hello, World!', function(error){
    if (error)
        console.log('Falha ao escrever arquivo:', error);
    else
        console.log('Arquivo escrito com sucesso!');
});
```

> Todas as funções apresentadas possuem comportamento assíncrono. As variantes síncronas muitas vezes
são convencionadas com o termo `Sync`.

## Módulo HTTP (montagem de servidor HTTP)

### Servidor
Crie um arquivo chamado `server.js` que abrigará o código do servidor HTTP:

```js
"use strict";

const http = require('http');

const server = http.createServer(function(request, response){
    
    // Escrever cabeçalho HTTP
    response.writeHead(200, {"content-type": "text/html"});
    
    response.write(`<h1>Hello, World!</h1>URL: ${request.url}`);
    
    response.end();
});

server.listen(8080); // o servidor escutará na porta 8080
```

Para levantar o servidor, basta executar o script acima normalmente.

```js
node server.js
```

Perceba que o script ficará 'congelado', pois será aberto o processo para o servidor HTTP escutar na
porta indicada.

Para experimentar o código, basta visitar a rota `localhost:8080/hello` no browser, por exemplo.

### Client
Crie um arquivo chamado `client.js` e insira o conteúdo abaixo:
```js
"use strict";

const http = require('http');

const request = http.request({
    hostname: 'localhost',
    path: '/hello',
    method: 'GET',
    headers: {Accept: 'text/html'},
}, function(response){
    console.log('Servidor respondeu com status:', response.statusCode, response.status);
});

request.end();
```

Execute o script e verifique a saída gerada:

```bash
node client.js
```

### Streams
Streams de gravação são um conceito muito utilizado em Node. Todos os streams de gravação possuem
um método `write()`, que pode ou receber uma `String` ou `Buffer`. Seus métodos `end()` encerram
a transmissão, podendo passar um último conteúdo como parâmetro antes do encerramento.

É possível criar *streams* de gravação que apontam para um arquivo com a função 
`fs.createWritebleStream()`. Assim, é possível fazer diversas chamadas `write()` no objeto resultante
para escrever o arquivo peça por peça, ao invés de escrever tudo com a função `fs.writeFile()`.

No entanto, a facilidade em chamada de métodos não ocorre com *streams* de leitura. Para lê-los, é
preciso usar manipuladores de eventos.

#### Método `on()`
De forma similar ao método `addEventListener()`, o método `on()` irá registrar uma função passada como
parâmetro para acioná-la dada a ocorrência de algum evento.

##### Servidor HTTP com uso do método `on()`
```js
"use strict";

const http = require('http');

http.createServer(function(request, response){
    
    // Escrever cabeçalho HTTP
    response.writeHead(200, {"content-type": "text/plain"});
    
    request.on('data', function(chunk){
        response.write(chunk.toString().toUpperCase());
    });
    
    request.on('end', function(){
        response.end();
    });
    
}).listen(process.env.PORT);
```

#### Client HTTP com uso do método `on()`
```js
"use strict";

const http = require('http');

const request = http.request({
    hostname: 'localhost',
    port: process.env.PORT,
    method: 'POST'
}, function(response){
    response.on('data', function(chunk){
        process.stdout.write(chunk.toString());
    });
});

request.end('Hello server');
```

## Tratamento de Erros com Promise
O Node oferece uma biblioteca para se trabalhar com **Promise**, possibilitando a captura das
exceções lançadas por funções de callback e propagá-las como falhas.

### Instalação do Promise
```bash
npm install promise
```

### Utilização
Leitura de um arquivo de texto. Percebe-se como o tratamento de erro ficou compactado com uso
do Promise.

```js
const Promise = require('promise');
const fs = require('fs');

// O método 'denodeify' converte uma função assíncrona para uma função que retorna um promise.
const readFile = Promise.denodeify(fs.readFile);

readFile('file.txt', 'utf-8').then(function(content){
    console.log('Content:',content);
}, function(error){
    console.log('Falha ao ler o arquivo:',error);
});
```