# HTTP

## XMLHttpRequest
É a interface pelo qual o JS pode fazer requisições HTTP. Apesar do nome incluir o termo "XML", a interface 
não possui qualquer relação. Mesmo assim, é possível fazer pedidos e envio de conteúdo em XML.

**IMPORTANTE**: caso esteja trabalhando com o **Node.js**, será preciso seguir os passos abaixo para poder
fazer requisições. Sugiro um pacote do NPM chamado **xmlhttprequest**. Se estiver trabalhando com o **browser**,
**não será preciso utilizar pacote extra**.

### Uso do `xmlhttprequest` com Node.js
#### Instalação do `xmlhttprequest`
```bash
npm install xmlhttprequest
```

#### Utilização
No início do código, insira:

```js
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Para instanciar, só fazer...
const request = new XMLHttpRequest();
```


### Enviando uma Request Síncrona
A request síncrona será terminada quando o método `send()` retornar.

```js
"use strict";

const request = new XMLHttpRequest();

// open(MÉTODO, URL, ASSINCRONA)
// ASSÍNCRONA: caso seja true, a operação será assíncrona; caso contrário, será síncrona.
request.open('GET', 'https://cdn.rawgit.com/cristiancmello/eloquent-js/e695a2c2/examples/data1.json', false);
request.send(null); // é preciso colocar send(null) em requisições do tipo 'GET'

// request.responseText só ficará disponível após o término da request
console.log(request.responseText);
```

#### Obter `status` e `content-type`
Vale ressaltar que a string `content-type` é **case-insensitive**.
```js
"use strict";

const request = new XMLHttpRequest();

request.open('GET', 'https://cdn.rawgit.com/cristiancmello/eloquent-js/e695a2c2/examples/data1.json', false);
request.send(null);

console.log(request.status);                            // 200
console.log(request.getResponseHeader('content-type')); // 'application/json;charset=utf-8'
```

### Enviando uma Request Assíncrona
A desvantagem da forma de requisição síncrona, exemplificada anteriormente, é no travamento do script
enquanto o cliente e o servidor estão se comunicando.

Entretanto, no método `open()` da request, caso passemos `true` no terceiro argumento, a request
será realizada em modo **ASSÍNCRONO**. Desta forma, **não haverá o travamento do script enquanto se estiver 
esperando pela resposta da request**.

```js
"use strict";

const request = new XMLHttpRequest();

request.open('GET', 'https://cdn.rawgit.com/cristiancmello/eloquent-js/e695a2c2/examples/data1.json', true);

// Adição do Event Listener para escutar evento 'load' da request
request.addEventListener('load', function(){
    console.log('Done:', request.status);
});

request.send(null);

// Após o término da request, será mostrado 'Done: 200'
```

#### Fazendo parse de request em JSON
A seguir, um exemplo simples parse de uma resposta JSON retornada por uma request a um end-point 
hipotético.

```js
"use strict";

const request = new XMLHttpRequest();

request.open('GET', 'https://cdn.rawgit.com/cristiancmello/eloquent-js/e695a2c2/examples/data1.json', true);

request.addEventListener('load', function(){
    const pessoa = JSON.parse(request.responseText);
    
    console.log('Nome:', pessoa.nome);
    console.log('Email:', pessoa.email);
});

request.send(null);

/* Após o término da request, será mostrado:
    
    Nome: John
    Email: john@doe.com
*/
```

## Promises (padrão ES2015)
Escrever códigos assíncronos utilizando somente XMLHttpRequest começa a se tornar um problema devido 
a quebra de fluxo de processamento, dificuldades em checar erros de códigos e verbosidade no tratamento 
de erros.

Uma das tentativas de se criar uma abstração extra para manipulação de ações assíncronas é a interface
`promises`. Ela encapsula uma ação assíncrona em um objeto, que pode ser instruído a fazer algo quando
a ação finalizar ou falhar.

Para mais informações: [Promise.js](https://www.promisejs.org/).

### Escrevendo um wrapper com Promise
O exemplo da seção ***'Fazendo parse de request em JSON'*** pode ser reescrito como:

```js
// wrapper para requisições GET
function get(url)
{
    return new Promise(function (succeed, fail){
        const request = new XMLHttpRequest();
        
        request.open('GET', url, true);
        
        request.addEventListener('load', function(){
            if (request.status < 400)
                succeed(request.responseText);
            else
                fail(new Error("Request failed: " + request.statusText));
        });
        
        request.addEventListener('error', function(){
            fail(new Error("Network error"));
        });
        
        request.send(null);
    });
}

// Fazer a requisição GET
get('https://cdn.rawgit.com/cristiancmello/eloquent-js/e695a2c2/examples/data1.json').then(function(text){
    const pessoa = JSON.parse(text);
    
    console.log('Nome:', pessoa.nome);
    console.log('Email:', pessoa.email);
}, function(error){
    console.log("Failed to fetch data1.json: " + error);
});
```

**IMPORTANTE**: `then()` é um método que retorna uma `promise`. Assim, é possível encadear sucessivamente
                retornos de `promises`.
                
#### Transformando o resultado de uma `promise`
```js
// wrapper para requisições GET
function get(url)
{
    return new Promise(function (succeed, fail){
        const request = new XMLHttpRequest();
        
        request.open('GET', url, true);
        
        request.addEventListener('load', function(){
            if (request.status < 400)
                succeed(request.responseText);
            else
                fail(new Error("Request failed: " + request.statusText));
        });
        
        request.addEventListener('error', function(){
            fail(new Error("Network error"));
        });
        
        request.send(null);
    });
}

// Função retorna uma promise. É importante ressaltar que os erros serão passados por quem
// receber a 'promise'.
function getJSON(url)
{
    return get(url).then(JSON.parse);
}

// Alternativa abaixo leva em conta encadeamento com tratamento de exceção.
getJSON('https://cdn.rawgit.com/cristiancmello/eloquent-js/e695a2c2/examples/data1.json').then(function(pessoa){
    console.log('Nome:',pessoa.nome);
    console.log('Email:',pessoa.email);
}).catch(function(error){
    console.log(String(error));
});

/*
    SAÍDA:
    
    Nome: John
    Email: john@doe.com
    
    Error: Request failed...
*/
```
