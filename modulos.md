# Módulos

## Namespaces
O JS não possui mecanismo explícito de criação de módulos para organização dos códigos. No entanto, os objetos 
podem ser utilizados para para criar sub-namespaces publicamente acessíveis.

## Reuso
A criação de módulos estimula uma melhor reutilização dos códigos, além de facilitar a instalação, atualização
e correção.

### NPM
É um serviço online que rastreia e distribui pacotes (ou módulos), permitindo-se a busca por funcionalidades que
precisamos para algum projeto.

[NPM Website](https://docs.npmjs.com/getting-started/what-is-npm)

### Funções como Namespaces
A única maneira de se criar namespace em JS é utilizando função. Caso contrário, as variáveis ficam visíveis
por toda a aplicação.

Abaixo, estão dois exemplos de criação de namespace:

```js
"use strict";

const dayName = function() {

    // a variável 'names' estará visível apenas no escopo desta função.
    const names = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    
    return function(number) {
        return names[number];
    };
};

// Podemos chamar a função da forma abaixo. Muito inconveniente.
console.log(((dayName)())(2));  // 'Tuesday'
```

A seguir, o mesmo exemplo anterior, mas fazendo uso de um truque do JS para eliminar a complexidade
de chamada da função `dayName`.

```js
"use strict";

const dayName = function() {
    const names = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    
    return function(number) {
        return names[number];
    };
}(); // aqui está o ponto-chave para transformar a expressão de função

// Podemos chamar a função da forma abaixo. Muito inconveniente.
console.log(dayName(2));  // 'Tuesday'
```

#### Função como Namespace de Configuração/Instalação
A seguir, será apresentada um implementação de função como namespace que tem o potencial de servir
de script de instalação ou configuração de módulos e *prototypes*. Ele encapsula o código em uma 
função para, novamente, prevenir que as variáveis que ele usa internamente estejam no escopo global.

```js
"use strict";

(function(){
    function multiply(x, y){
        return x * y;
    }
    
    let hundred = 100;
    console.log(multiply(hundred, 5)); // 500
})();
```

### Objetos como Namespaces

#### Para módulos pequenos
Pode encapsular 2 funcionalidades, por exemplo, dentro de um objeto.

```js
"use strict";

const weekDay = function(){
    const names = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    
    return {
        name:   function(number){ return names[number]; },
        number: function(name)  { return names.indexOf(name) }
    };
}();

console.log(weekDay.name(weekDay.number('Tuesday')));
```

#### Para módulos maiores (usualmente utilizados para front-end)

```js
(function(exports) {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];

  exports.name = function(number) {
    return names[number];
  };
  exports.number = function(name) {
    return names.indexOf(name);
  };
})(window.weekDay = {});

console.log(weekDay.name(weekDay.number("Saturday"))); // 'Saturday'
```

## Carregando módulos lentamente
Técnicas de carregamento de módulos convencionais, como utilização de `requires` primitivos pode afetar
em muito o carregamento de páginas Web. Isso ocorre devido ao comportamento do carregamento do JS, pois
quanto o código estiver sendo carregado, nenhuma outra ação pode ser realizada ao mesmo tempo.

Há duas formas populares de se contornar isso:

- **Browserify**: concatena todas as dependências feitas por `requires` dentro de um único grande arquivo.
- **AMD** (Asynchronous Module Definition): encapsular o módulo em uma função, carregar os módulos 
                                            que ela depende em segundo plano, e apenas rodar essa 
                                            função quando todas suas dependências forem carregadas.

    - ***RequireJS***: implementação robusta de carregamentos de módulos com o AMD.
                       [RequireJS Website](http://requirejs.org/).

### Exemplo de uso com o AMD
```js
define([], function() {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
});
```

## Projeto de Interfaces dos Módulos
É recomendável adquirir experiência ao se acumular aprendizado com vários tipos de interfaces. Se algo
é ruim ou doloroso de se utilizar, tente tornar a experiência de uso mais agradável com o encapsulamento
de interfaces, por exemplo.

### Previsibilidade
Siga convenções de nomes e formato de argumentos para tornar familiar a utilização de algum componente.
Evite inovar em carregamento de resposabilidade, o chamado "empilhamento de inteligência". Faça
pequenas funcionalidades com escopo bem definido.

### Composability ("Componibilidade")
Não forneça estrutura de dados com interface própria, com iteradores ou operadores. As funções da aplicação
devem aceitar formatos universais para o JS, como Array ou String. Caso seja optado por fornecer estruturas
próprias, o código poderá não ser reutilizável em outros projetos na falta das estruturas necessárias para
a aplicação funcionar.

### Interface em Camadas
Um grande dilema comum no desenvolvimento de software é na relação do oferecimento de uma interface simples
para o usuário em detrimento com a necessidade técnica, onde será preciso maior nível de especialização.

Logo, é recomendável a disposição de 2 tipos de interface:

- **Interface de alto nível**: recebe parâmetros simples e realiza a tarefa proposta;
- **Interface de baixo nível**: permite configuração de tarefas complexas, isto é, com maior nível de
                                especialização.