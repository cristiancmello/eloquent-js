# JSON (JavaScript Object Notation)
O JS fornece alguns métodos úteis para o trabalho com representações de dados em JSON.

## Representação 

### Formato de Objeto
```json
{
    "primeiro_nome": "John",
    "ultimo_nome": "Doe",
    "idade": 30,
    "email": "john@doe.com"
}
```

### Formato de Array
```json
[
    {
        "primeiro_nome": "John",
        "ultimo_nome": "Doe",
        "idade": 30,
        "email": "john@doe.com"
    },
    {
        "primeiro_nome": "Lucy",
        "ultimo_nome": "Balldwin",
        "idade": 25,
        "email": "lucy@balldwin.com"
    }
]
```

#### Array dentro de um objeto
```json
{
    "primeiro_nome": "John",
    "ultimo_nome": "Doe",
    "idade": 30,
    "email": "john@doe.com",
    "telefones": [
        "99999", "98888"
    ]
}
```

#### Array contendo objetos dentro de um objeto
```json
{
    "primeiro_nome": "John",
    "ultimo_nome": "Doe",
    "idade": 30,
    "email": "john@doe.com",
    "telefones": [
        {
            "id": "1",
            "numero": "99999"
        },
        {
            "id": "2",
            "numero": "98888"
        }
    ]
}
```

## Método `JSON.stringify()`
Converte a representação de objeto (JSON) em string.

```js
const pessoa = {
    primeiro_nome: 'John',
    ultimo_nome: 'Doe',
    idade: 30,
    email: 'john@doe.com'
};

// Converter objeto 'pessoa' para uma string com JSON.
let strJson = JSON.stringify(pessoa);

console.log(strJson); // {"primeiro_nome":"John","ultimo_nome":"Doe","idade":30,"email":"john@doe.com"}
```

## Método `JSON.parse()`
Converte uma string com JSON em objeto.

```js
let strJson = '{"primeiro_nome":"John","ultimo_nome":"Doe","idade":30,"email":"john@doe.com"}';

console.log(JSON.parse(strJson).email); // "john@doe.com"
```

### Imprimir lista de atributos a partir de um JSON
```js
const getAttributesObject = (obj) => {
    let list = [];
    
    if (typeof obj !== 'object') return list;
    
    const navigate = (obj, l, indentation) => {
        if (obj === undefined)
            return;
        
        for(let attr in obj) {
            let tabs = "";
            for (let i = 0; i++ < indentation; tabs += "  ");

            l.push(tabs+attr);

            if (typeof obj[attr] == 'object') {
                navigate(obj[attr], l, ++indentation); indentation--;
            }
        }
    };
    
    navigate(obj, list, 0);
    return list;
};

getAttributesObject(
    JSON.parse(
        '[{"attr1_1":"value1_1","attr2_1":"value2_1","attr3_1":["#0","#1", {"attr1_2":"value1_2","attr2_2":{"attr1_3":"value1_3"}}], "attr4_1":"value4_1"}]'
    )).forEach((elem) => console.log(elem));
```