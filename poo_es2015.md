# Programação Orientada a Objeto (padrão ES2015)
O padrão ES2015 (também conhecido como ES6), fez adição de novos recursos sintáticos para expressão de orientação
a objetos. ***No entanto, é preciso evitar o uso em demasia deste tipo de programação, pois o suporte a classes ainda não
está totalmente completo***.

## Definição de uma Classe
Abaixo, temos a definição de uma classe chamada `Animal` e seu construtor.
```js
class Animal 
{
    // Definição do construtor.
    constructor(nome)
    {
        this.nome = nome;
    }
}

// Instanciação
let animal = new Animal('Felix');

console.log(animal.nome); // 'Felix'
```

## Getters e Setters
Agora é possível definir métodos acessores com os tokens `get` e `set`.

```js
class Animal 
{
    // Definição do construtor (é um pseudo-método).
    constructor(nome)
    {
        this.nome = nome; // this.nome é na verdade chamada ao método set
    }
    
    get nome()
    {
        return this._nome;
    }
    
    set nome(nome)
    {
        this._nome = 'Gato ' + nome;
    }
    
}

let animal = new Animal('Felix');

console.log(animal.nome); // 'Gato Felix'
```

### Herança
O JS ES2015 trouxe a palavra `extends`.

```js
class Animal 
{
    // Definição do construtor.
    constructor(nome)
    {
        this.nome = nome;
    }
    
    get nome()
    {
        return this._nome;
    }
    
    set nome(nome)
    {
        this._nome = nome;
    }
}

class Cao extends Animal
{
    ladra() 
    {
        console.log(`O ${this.nome} ladrou!`);
    }
}

let cao = new Cao('Cão'); // 'O Cão ladrou!'

cao.ladra();
```

### Método `static`
O JS ES2015 trouxe a palavra `static` para definição de método estáticos.

```js
class Animal 
{
    // Definição do construtor.
    constructor(nome)
    {
        this.nome = nome;
    }
    
    get nome()
    {
        return this._nome;
    }
    
    set nome(nome)
    {
        this._nome = nome;
    }
    
    // Método 'getter' estático
    static get tipo()
    {
        return 'Animal';
    }
    
    static obterStatus()
    {
        console.log('Vivo');
    }
}

console.log(Animal.tipo); // 'Animal'
Animal.obterStatus();     // 'Vivo'
```

### Método/Superpropriedade `super()`
Com `super()`, podemos chamar o construtor da classe-pai, bem como propriedade da classe-pai.

```js
class Animal 
{
    // Definição do construtor.
    constructor(nome)
    {
        this.nome = nome;
    }
    
    get nome()
    {
        return this._nome;
    }
    
    set nome(nome)
    {
        this._nome = nome;
    }
    
    // Método 'getter' estático
    get tipo()
    {
        return 'Animal';
    }
}

class Gato extends Animal
{
    constructor(nome, raca)
    {
        super(nome);
        
        this.raca = raca;
    }
    
    get raca()
    {
        return this._raca;
    }
    
    set raca(raca)
    {
        this._raca = raca;
    }
    
    // Override em nome
    get nome()
    {
        return this._nome;
    }
    
    set nome(nome)
    {
        this._nome = `Gato ${nome}`;
    }
    
    get tipo()
    {
        return 'Um gatinho';
    }
    
    get ancestral()
    {
        return super.tipo;
    }
}

console.log((new Gato('Felix', 'Vira-lata')).ancestral); // 'Animal'
```

