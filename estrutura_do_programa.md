# Estrutura do Programa

## Expressão
É um fragmento de código.

```js
!true
1
```

## Afirmação
É a uma expressão acompanhada de **Semicolon (;)**.

```js
!true;
1;
```

## Variáveis (padrão ES2015)
> Obs.: a declaração com **var** está sendo desencorajada a partir do padrão ES2015.

### Let
A declaração com `let` permite que a variável seja reatribuída.

```js
let idade = 22;
console.log(idade); // 22

idade = 34;
console.log(idade); // 34
```

### Const
A declaração com `const` **não permite reatribuição**.

```js
const idade = 22;
console.log(idade); // 22

idade = 34;
console.log(idade); // 22
```

### Destructuring
É uma forma de declarar variáveis extraindo valores de **objetos** e **arrays**. Exemplo:

```js
const [x, y, z] = [1, 2, 3];

console.log(x); // 1
console.log(y); // 2
console.log(z); // 3
```

#### Com Rest Parameters
```js
const [a, b, ...rest] = [1, 2, 3, 4];

console.log(a);     // 1
console.log(b);     // 2
console.log(rest);  // [3, 4]
```

#### Com objetos
```js
const pessoa = {nome: 'Caius', idade: 40};
const {nome, idade} = pessoa;

console.log(nome);  // 'Caius'
console.log(idade); // 40
```

### Ambiente (Environment)
*Environment* é a coleção de variáveis e seus valores que existe por um determinado tempo. Por exemplo, quando
se programa para um browser, existem variáveis e funcionalidades já iniciadas.

### Função `console.log`
```js
let a = 10;

console.log('a =', a); // a = 10 (com comma, há um espaço adicional)
```
### Funções `confirm()` e `prompt()` (Browser)
- `confirm('Prosseguir?')`: mensagem que retorna `false` ou `true` conforme a resposta;
- `prompt('Insira seu nome')`: mensagem que retorna a string escrita.
