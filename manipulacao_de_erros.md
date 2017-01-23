# Manipulação de Erros

## Modo Estrito
O JS costuma ser tolerante com alguns tipos de omissões feitas pelo programador. No entanto, podemos deixá-lo mais rígido
com a colocação da string `"use strict"` no **ínicio do arquivo** ou no **corpo de alguma função**.

Exemplo de exceção lançada por omitir declaração de variável.

```js
const imprimirLista = (lista) => {
    "use strict";
    
    for(i = 0; i < lista.length; i++)
    {
        console.log(lista[i]);
    }
};

imprimirLista([1, 2, 3, 4, 5, 6]); // ReferenceError: i is not defined
```

Sem o modo estrito, a **omissão de declaração de variável**, por exemplo, faz com que a **variável** seja **implicitamente**
declarada como **variável global**.

Outro caso, em que um construtor é chamado sem a precedência do operador `new`:

```js
function Pessoa(nome){
    this.nome = nome;
}

const pessoa = Pessoa('John Doe');
console.log(nome); // uma variável global será implicitamente criada.
```

Com o `"use strict"`, uma exceção será lançada:

```js
"use strict";

function Pessoa(nome){
    this.nome = nome;
}

const pessoa = Pessoa('John Doe');
console.log(nome); // TypeError: Cannot set property 'nome' of undefined
```

## Testando
O JS não auxilia muito na procura de erros no código e assim, isso acaba nos forçando a adotar
estratégias de teste. Ficar executando o código por diversas vezes é algo muito cansativo. Logo,
podemos criar um código de teste.

```js
"use strict";

// Construtor
function Pessoa(nome, idade)
{
    this.nome = nome;
    this.idade = idade;
}

Object.defineProperty(Pessoa.prototype, 'nome', {
    get: function(){
        return this._nome;
    },
    
    set: function(nome){
        this._nome = nome;
    }
});

Object.defineProperty(Pessoa.prototype, 'idade', {
    get: function(){
        return this._idade;
    },
    
    set: function(idade){
        if (idade >= 18)
            this._idade = idade;
        else
            this._idade = null;
    }
});

function testPessoa()
{
    if ((new Pessoa('John Doe', 30)).idade == null) 
        console.log('erro: idade < 14');
    
    // ...
}

testPessoa();
```

No entanto, o código acima é um pouco estranho do ponto de vista de abstração de identificação de erros.
A seguir, será apresentado brevemente uma framework de testes chamado **Mocha** para Node.js.

### Mocha Framework (Node.js)

#### Instalação
No terminal, execute:

```bash
npm install mocha
```

#### Preparação do projeto
Crie uma pasta chamada `test` e um arquivo chamado `test/test.js`:

```bash
mkdir test
cd test
touch test.js
```

Em seguida, crie um arquivo chamado `package.json` com o seguinte conteúdo:

```json
{
    "scripts": {
        "test": "mocha"
    }
}
```

Crie um arquivo, chamado `pessoa.js`, com o código-fonte da aplicação a ser testada. Exemplo:

```js
"use strict";

class Pessoa
{
    constructor(nome, idade)
    {
        this.nome = nome;
        this.idade = idade;
    }
    
    get nome()
    {
        return this._nome;
    }
    
    set nome(nome)
    {
        this._nome = nome;
    }
    
    get idade() 
    {
        return this._idade;
    }
    
    set idade(idade)
    {
        if (idade >= 18)
            this._idade = idade;
        else
            this._idade = null;
    }
}

// O código abaixo exporta a referência da classe Pessoa.
module.exports = Pessoa;
```

**IMPORTANTE**: a árvore do projeto para teste deve ficar da seguinte forma:

```
pasta-raiz
    /test
        testPessoa.js
    pessoa.js
    package.json
```

No arquivo `test/testPessoa.js`, coloque o código:

```js
const assert = require('assert');
const Pessoa = require('../pessoa');

describe('Pessoa', function() {
	describe('create', function() {
		it('...success', function() {
			const pessoa = new Pessoa('John Doe', 30);
			
			assert.equal(pessoa.nome, 'John Doe', "Era esperado 'John Doe' :(");
			assert.equal(pessoa.idade, 30, 'Era esperado 30 anos :(');
		});
		
		it('...fail (idade is null)', function(){
			const pessoa = new Pessoa('John Doe', 14);
			
			assert.equal(pessoa.idade, null, "Era esperado null em idade :(");
		});
	});
});
```
#### Execução dos testes
E, por fim, execute o teste com o comando:

```bash
npm test
```

Um relatório será emitido, semelhante a este:

```
...
> mocha



  Pessoa
    create
      ✓ ...success
      ✓ ...fail (idade is null)


  2 passing (12ms)
```

## Exceções

### Lançamento da exceção com `throw new`

```js
"use strict";

function movimento(orientacao)
{
    switch(orientacao)
    {
        case "esquerda":
            return "Move para esquerda";
            
        case "direita":
            return "Move para direita";
        
        default:
            throw new Error(`Movimento '${orientacao}' inválido.`);
    }
}

console.log(movimento('pra cima'));

// A seguinte saída será emitida
/*
    throw new Error(`Movimento '${orientacao}' inválido.`);
    ^
    
    Error: Movimento 'para cima' inválido.
    ...
*/
```

### Tratamento da exceção com `try...catch...finally`

```js
"use strict";

function movimento(orientacao)
{
    switch(orientacao)
    {
        case "esquerda":
            return "Move para esquerda";
            
        case "direita":
            return "Move para direita";
        
        default:
            throw new Error(`Movimento '${orientacao}' inválido.`);
    }
}

const objeto = {
    estado: 'parado',
    acao: movimento
};

try
{
    objeto.estado = 'Em movimento';
    objeto.acao('pra cima');
} catch (error)
{
    console.log(error.message);
} finally
{
    // O código será executado aqui independente se houve ou não uma exceção.
    objeto.estado = 'parado';       // restaurar a ação
    console.log(objeto.estado);
    
    /*  SAÍDA:
        Movimento 'pra cima' inválido.
        parado
    */
}
```

### Tipificando exceções

```js
"use strict";

function InputError(message)
{
    this.message = message;
    this.stack = (new Error()).stack;
}

// InputError herdará de Error
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = 'InputError';

function movimento(orientacao)
{
    switch(orientacao)
    {
        case "esquerda":
            return "Move para esquerda";
            
        case "direita":
            return "Move para direita";
        
        default:
            throw new InputError(`Movimento '${orientacao}' inválido.`);
    }
}

const objeto = {
    estado: 'parado',
    acao: movimento
};

try
{
    objeto.estado = 'Em movimento';
    objeto.acao('pra cima');
} catch (e)
{
    if (e instanceof InputError)
        console.log(`InputError: ${e.message}`);
    else
        throw e; // caso seja outra exceção, repasse a responsabilidade
} finally
{
    // O código será executado aqui independente se houve ou não uma exceção.
    objeto.estado = 'parado';       // restaurar a ação
    console.log(objeto.estado);
    
    /*  SAÍDA:
        InputError: Movimento 'pra cima' inválido.
        parado
    */
}
```