# Valores, Tipos e Operadores

## Valores
O JS possui *6* tipos de valores:
- *number*
- *string*
- *boolean*
- *object*
- *function*
- *undefined*

> *Para criar um valor, é apenas necessário invocar um nome*

### Números
O JS determina que cada *number* possua comprimento de *64 bits*.

- Com *number*, podemos representar até *18 quintilhões*;
- Com *number* sendo *real*, podemos representar o valor máximo de *9 quadrilhões*;
- Notação científica: *2.998e8* = *2.998 * 10^8*;
- *IMPORTANTE*: números fracionários serão sempre aproximações.

### Aritmética
- Vale a precedência matemática (1ª multiplicação, ...);

### Números Especiais
O JS traz *3* valores consideradores números, mas não se comportam como tal.

- *Infinity* e *-Infinity*: infinito positivo e negativo. *Infinity - 1* continua sendo infinito;
- *NaN* (*Not a Number*): obtém-se quando se declara *0 / 8* ou *Infinity - Infinity*;

### Strings
- JS aceita tanto *''* quanto *""*;
- JS também aceita caracteres de escape: *\n*, *\t*;
- *Operador +*: *concatenação* de strings;

### Operadores Unários
- `typeof <valor>`: fazer avaliação de tipo de dado;
- `-<number>`: inversão;

### Valores Booleanos
- **Comparações**:
    - *Entre números*: *20 < 30 = true*;
    - *Entre strings*: *"hello" < "world" = true*;
    - *Operadores relacionais*: 
        - *<, >, <=, >=, == (igual em valor), === (igual em valor e tipo), != (diferente em valor) !== (diferente em valor OU diferente em tipo)*;
        - Exemplo clássico: 
            - `'2' != 2;  // false, pois '2' é igual a 2 em valor`
            - `'2' !== 2; // true, pois '2' é igual a 2 em valor, MAS são diferentes em tipo`
        - *Comparação com NaN*: `NaN == NaN; // false, pois NaN não gera nada que faça sentido`

### Operadores Lógicos
- *AND*: `true && false`;
- *OR*:  `true || false`;
- *NOT*: `!false`.

### Operadores Bitwise
Por padrão, o JS converte *operandos* de operadores **bitwise** em **inteiros com sinal de 32 bits**.

- **Bitwise AND**                  : `0b101 & 0b101` ou `0x5 & 0x5` ou `5 & 5; // (0101) AND (0101) = (0101)`;
- **Bitwise OR**                   : `4 | 3; // 3`;
- **Bitwise XOR**                  : `4 ^ 3; // 1`;
- **Bitwise NOT**                  : `~10; // -11 (complemento de 10)`;
- **Bitwise Left Shift**           : `0b0001 << 2; // 0b0100 (deslocar zeros à esquerda)`;
- **Bitwise Right Shift**          : `0b0100 >> 2; // 0b0001 (deslocar zeros à direita, PRESERVANDO-SE O SINAL)`;
- **Bitwise Zero-fill Right Shift**: `-9 >>> 2; // 1073741821 (deslocamento à direita, PERDENDO-SE O SINAL)`.

### Valores Indefinidos
Temos dois valores notáveis: *null* e *undefined*.

### Conversão Automática de Tipo
```js
console.log(8 * null)   // 0 (null será convertido para 0)
console.log("5" - 1)    // 4  (subtração)
console.log("5" + 1)    // 51 (concatenação)
console.log("five" * 2) // NaN (valor desconhecido)
console.log(false == 0) // true (0 == false == "")
```
### Curso-Circuito de && e ||
```js
console.log(null || "user")   // user, pois à esquerda null será convertido em false, fazendo-se retornar "user"
console.log("Karl" || "user") // Karl, pois à esquerda 'Karl' será convertido em true, fazendo-se retornar o mesmo

console.log(null && "user")   // null. Lógica é inversa ao operador ||
console.log("Karl" && "user") // Karl. Lógica é inversa ao operador ||
```
**IMPORTANTE**: a avaliação é feita sempre da **ESQUERDA-DIREITA**. Logo, o JS será um pouco "preguiçoso" ao se avaliar o lado direito
dependendo da operação.
