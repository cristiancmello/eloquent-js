# Funções (padrão ES2015)
## Definindo uma Função 
Define-se um procedimento (função sem retorno explícito -- retorna *undefined*):

```js
// Uso de Arrow Function "() => {}"
const hello = () => {
    console.log('Hello, Word!');
}

hello();    // mostra mensagem 'Hello, World!'
```

Define-se agora uma função de soma (com retorno explícito):

```js
const somar = (a, b) => {
    return a + b;
}

console.log(somar(10, 20)); // 30
```

### Default Parameters
É possível definir parâmetros padronizados caso algum parâmetro deixe de ser passado.
Exemplo:

```js
const multiply = (a, b = 1) => {
    return a * b;
}

console.log(multiply(20));   // 20
```

Uma versão encurtada é possível ser definida de modo equivalente:

```js
const multiply = (a, b = 1) => a * b;

console.log(multiply(20));  // 20 
```

### Rest Parameters
Ao invés de recorrermos ao objeto `arguments` para obter os parâmetros das funções, podemos agora utilizar
*Rest Parameters*. Exemplo:

```js
// Obs.: após reticências, é válida a colocação de qualquer outro nome.
const soma = (...numbers) => {
    let resultado = 0;
    
    numbers.forEach((number) => {
        resultado += number;
    });
    
    return resultado;
}

console.log(soma(1, 2, 3, 4));  // 10
```

### Abordagem puramente funcional
```js
/*
Suponha uma lista L = (1, 2, 3, 4). Seja 'acc' o acumulador e 'current' o 
valor da posição corrente (atual). Inicia-se 'acc' como sendo o 1º elemento 
da lista L, somado a um valor inicial (sendo 0, neste caso) e 'current' o 2º elemento.

(1, 2, 3, 4) acc = 1 + 0,   current = 2; opera-se acc + current = 3;  acc = 3;
   (2, 3, 4) acc = 3,       current = 3; opera-se acc + current = 6;  acc = 6;
      (3, 4) acc = 6,       current = 4; opera-se acc + current = 10; acc = 10;
         (4) acc = 10,      current = -; FIM DA RECURSÃO
         
Logo, resultado = acc = 10.
*/
const soma = (...numbers) =>
    numbers.reduce((acc, current) => acc + current, 0);
    
console.log(soma(1, 2, 3, 4));  // 10
```

- Podemos ainda obter o valor inicial (primeiro elemento), ao invés de se estabelecer o número 0:

```js
/*
Suponha uma lista L = (1, 2, 3, 4). Seja 'acc' o acumulador e 'current' o 
valor da posição corrente (atual). Inicia-se 'acc' como sendo um valor inicial 
(sendo acc = start = 1, neste caso) e 'current' o 2º elemento.

(1, 2, 3, 4) acc = start = 1, current = 2; opera-se acc + current = 3;  acc = 3;
   (2, 3, 4) acc = 3,         current = 3; opera-se acc + current = 6;  acc = 6;
      (3, 4) acc = 6,         current = 4; opera-se acc + current = 10; acc = 10;
         (4) acc = 10,        current = -; FIM DA RECURSÃO
         
Logo, resultado = acc = 10.
*/
const somar = (start, ...numbers) =>
    numbers.reduce((acc, current) => acc + current), start);
    
console.log(soma(1, 2, 3, 4));  // 10
```

### Declaração de Função (forma mais clássica)
Podemos fazer da forma mais clássica.

```js
function multiply(a, b = 1)
{
    return a * b;
}

console.log(multiply(20));  // 20
```

> Obs.: a grande vantagem desta última forma é que podemos chamar a função em qualquer lugar no código, isto é,
tanto antes quanto depois da declaração.

## Closure
É uma funcionalidade capaz de referenciar uma instância específica de uma variável local após a execução de uma
função. A função que *fecha sobre* variáveis locais (o que chamamos de **closes over**) é chamada de **Closure**.

Exemplo:

```js
const multiplier = (factor) => {
    return (number) => {
        return number * factor;
    }
}

let twice = multiplier(2);
console.log(twice(5)); // 2 * 5 = 10
```

## Recursão
É suportada pelo JS.