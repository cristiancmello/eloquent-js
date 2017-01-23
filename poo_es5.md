# Programação Orientada a Objeto (padrão ES5)

## Métodos
```js
const cao = {};

cao.latir = () => {
    console.log('au au au');
};

cao.latir(); // 'au au au'
```

### Palavra `this`
Em JS, `this` aponta para o objeto pela qual foi chamada.

```js
function latir()
{
    console.log(this.nome + ' diz: au au au');
}

const cao = { nome: 'Rex', latir: latir };

cao.latir(); // 'Rex diz: au au au'
```

## Prototypes
Todos os objetos em JS possuem um ancestral chamado `Object.prototype`.

```js
console.log(Object.getPrototypeOf({}) == Object.prototype); // true (isto é, {} <=> Object.prototype)
```

### `Object.create()`
Podemos criar um protótipo usando o método `Object.create()`.

```js
const protoCao = {
    latir: function() {
        console.log('O cão', this.nome, 'faz au au au');
    }
};

const caoRex = Object.create(protoCao);
caoRex.nome = 'Rex';
caoRex.latir(); // 'O cão Rex faz au au au'
```

## Construtor
Chamar uma função precedida pela palavra `new` vai fazer com que ela seja tratada como **Construtor**. A seguir, exemplo de código 
com chamada ao construtor e uso de prototype.

```js
function Cao(nome) {
    this.nome = nome;
};

Cao.prototype.latir = function() {
    console.log('O cão', this.nome, 'faz: au au au');
};

const caoRex = new Cao('Rex');

caoRex.latir(); // 'O cão Rex faz: au au au'
```

## Getters e Setters
Podemos definir métodos acessores aos atributos dos objetos com o ***syntax sugar*** `get` e `set`.

```js
const pessoa = {
    nome: '',
    
    get nome(){
        return this._nome;
    },
    
    set nome(nome){
        this._nome = nome;
        console.log(`Você definiu nome para ${nome}`);
    }
};

pessoa.nome = 'John Doe'; // 'Você definiu nome para John Doe'
```

### Definição com uso de `Object.defineProperty()`
Podemos definir `getter` ou `setter` utilizando-se o método `Object.defineProperty`.

```js
function Pessoa(nome)
{
    this._nome = nome;
}

Object.defineProperty(Pessoa.prototype, "nome", {
    get: function(){
        return this._nome;
    },
    set: function(nome){
        this._nome = nome;
        console.log(`Agora você se chama ${nome}`);
    }
});

const pessoa = new Pessoa('John Doe');
console.log(pessoa.nome);       // 'John Doe'
pessoa.nome = 'Joaquim Nabuco'; // 'Agora você se chama Joaquim Nabuco'
```

## Herança
O JS possibilita um truque para criar um mecanismo de herança com o **prototype**. No entanto, deve-se evitar
seu extensivo devido ao possível aumento da complexidade de programação dos objetos. Sugestão de um mecanismo de
herança:

```js
function Pessoa(nome)
{
    this.nome = nome;
}

function Administrador(nome)
{
    // Com a função ancestral 'call', podemos repassar o parâmetro 'nome' para 
    // a classe-pai 'Pessoa'. O primeiro parâmetro de call indica o contexto do this, que, neste caso,
    // é de Administrador.
    Pessoa.call(this, nome);
}

// Administrador descende de Pessoa
Administrador.prototype = Object.create(Pessoa.prototype);

Administrador.prototype.senha = function(senha) {
    this.senha = senha;
}

const adm = new Administrador('Joaquim Nabuco');
adm.senha = '123';

console.log(adm.nome);  // 'Joaquim Nabuco'
console.log(adm.senha); // '123'
```

## Operador `instanceOf`
Por vezes, precisaremos saber a descendência de um objeto criado.

```js
function Pessoa(nome)
{
    this.nome = nome;
}

function Administrador(nome)
{
    // Com a função ancestral 'call', podemos repassar o parâmetro 'nome' para 
    // a classe-pai 'Pessoa'. O primeiro parâmetro de call indica o contexto do this, que, neste caso,
    // é de Administrador.
    Pessoa.call(this, nome);
}

// Administrador descende de Pessoa
Administrador.prototype = Object.create(Pessoa.prototype);

Administrador.prototype.senha = function(senha) {
    this.senha = senha;
}

const adm = new Administrador('Joaquim Nabuco');
adm.senha = '123';

console.log(adm.nome);  // 'Joaquim Nabuco'
console.log(adm.senha); // '123'

// instanceOf
console.log(adm instanceof Pessoa);        // true
console.log(adm instanceof Administrador); // true
```