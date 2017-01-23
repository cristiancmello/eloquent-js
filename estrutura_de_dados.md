# Estrutura de Dados
Tijolos das estruturas de dados:

- Number;
- String;
- Boolean.

Os **objetos** são encarregados de agrupá-los.

## Array
O JS permite armazenas uma sequência de valores com **arrays**. Exemplo:

```js
let listOfNumbers = [1, 2, 3, 4, -5];

console.log(listOfNumbers[1]);  // 2
```

## String
```js
let name = 'John Doe'; // ou "John Doe"

console.log(name[0]);  // 'J'
```

### Propriedades
Os Arrays e Strings possuem algumas propriedades muito úteis.

#### `length` (Array e String)
```js
let name = 'John Doe';

console.log(name.length); // 8
```

#### `slice()` (Array e String)
Retorna um **array**/**string** num intervalo especificado.

```js
// slice(índice inicial inclusivo, índice final exclusivo)
console.log([2, 3, -4, 5, 8].slice(1, 3));  // [3, -4]

// quando apenas 1 índice é especificado, retorna do ínício deste índice ao fim
console.log([2, 3, -4, 5, 8].slice(2));     // [-4, 5, 8]
```

#### `concat()` (Array)
Concatena arrays.

```js
let frutasCitricas = ['Laranja', 'Limão'];
let outrasFrutas = ['Banana', 'Caqui'];

let frutas = frutasCitricas.concat(outrasFrutas);

console.log(frutas); // ['Laranja', 'Limão', 'Banana', 'Caqui']
```

#### `indexOf()` e `lastIndexOf()` (Array)
```js
let frutas = ['Laranja', 'Maçã', 'Limão'];

// Pesquisa por um índice a partir do início do array.
console.log(frutas.indexOf('Maçã'));      // 1

// Pesquisa por um índice a partir do fim do array.
console.log(frutas.lastIndexOf('Limão')); // 2

// Ambos métodos aceitam indicação de onde começar a pesquisar.
console.log(frutas.indexOf('Maçã', 1));   // 1
```

#### `push()` e `pop()` (Array)
```js
let frutas = [];

// Inserir na última posição
frutas.push('Laranja');
frutas.push('Maçã', 'Limão');

console.log(frutas); // ['Laranja', 'Maçã', 'Limão']

// Retirar último elemento inserido
frutas.pop();

console.log(frutas); // ['Laranja', 'Maçã']
```

#### `unshift()` e `shift()` (Array)
```js
let frutas = [];

// Inserir na primeira posição
frutas.unshift('Laranja');
frutas.unshift('Maçã', 'Limão');

console.log(frutas); // ['Maçã', 'Limão', 'Laranja']

// Remover a partir da primeira posição
frutas.shift();

console.log(frutas); // ['Limão', 'Laranja']
```

#### `join()` (Array)
```js
let frase = ['The', 'Game', 'of', 'Thrones'];

console.log(frase.join(' ')); // 'The Game of Thrones'
```

#### `toUppercase()` (String)
```js
let name = 'John Doe';

console.log(name.toUppercase()); // JOHN DOE
```

## Objetos
Valores do tipo **objeto** são coleções arbitrárias de propriedades. Exemplo:

```js
const person = {
    name: 'John',
    lastName: 'Doe',
    age: 30,
    events: ['running', 'eating']
};

console.log(person.name);       // John
console.log(person.events[0]);  // 'running'
```

### Propriedades de nomes inválidos
Devem ser colocados entre aspas.

```js
const descriptions = {
    work: 'Went to work',
    'touched tree': 'Touched a tree'
};

console.log(descriptions.work);            // 'Went to work'
console.log(descriptions['work']);         // 'Went to work' (prop. pode ser acessar como Array)
console.log(descriptions['touched tree']); // 'Touched a tree'
```

### Deletando propriedades
Podemos usar o operador unário `delete`.

```js
const cao = {
    genero: 'Canis',
    especie: 'C. Lupus',
    subespecie: 'familiaris'
};

// Verificar a presença de propriedade
console.log('subespecie' in cao);   // true

// Deletar propriedade
delete cao.subespecie;

// Verificar a presença de propriedade
console.log('subespecie' in cao);   // false
```

## Mutabilidade
```js
const object1 = { value: 10 };
const object2 = object1;              // logo, object2 recebe referência em memória de object1
const object3 = { value: 10 };

console.log(object2 == object1);    // true, pois são o mesmo objeto
console.log(object3 == object1);    // false, pois apesar de serem iguais, não são o mesmo objeto

// Alterar valor de referência
object1.value = 15;

console.log(object2.value);         // 15
```

## Laço `for` em Objetos

### Um 'foreach' ao estilo JS
```js
const frutas = ['Laranja', 'Banana', 'Maçã'];

for (fruta in frutas)
{
    fruta = frutas[fruta];
    console.log('Fruta', fruta, 'está presente');
}

// Ou, utilizando-se o método forEach()
// Obs.: forEach consome mais CPU/RAM
frutas.forEach((fruta) => {
    console.log('Fruta', fruta, 'está presente');
});
```

## Strings e suas outras Propriedades
Valores como **String**, **Boolean** e **Number** são **IMUTÁVEIS**. Isto é, é possível tentar adicionar
propriedades, mas não serão de fato armazenadas.

### Propriedades

#### `slice()` e `indexOf()`
```js
console.log('um dois três'.slice(3, 7));     // 'dois'
console.log('um dois três'.indexOf('dois')); // 3 (posição na string)
```

#### `trim()`
Remove caracteres de escape ('\n', '\t', whitespace, ...) no **início** da string e no **fim**.

```js
console.log("\t\n     Banana, Maçã, Limão\n\n".trim()); // 'Banana, Maçã, Limão'
```

#### `charAt()`
Obtém o caractere da string de acordo com o índice passado como parâmetro.

```js
console.log('John Doe'.charAt(5)); // 'D'

// Modo equivalente
console.log('John Doe'[5]);        // 'D'
```

## Objeto Global
O escopo global também pode ser tratado como objeto em JS. Nos browsers, as variáveis de escopo global
ficam armazenadas no objeto `window`.

```js

// Obs.: os navegadores costumam não aceitar a declaração de variável com 'let/const', sendo esta variável
//       parte do escopo global em 'window'.
var client = 'John Doe';    

console.log('client' in window); // true
```