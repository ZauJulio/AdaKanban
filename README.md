# Desafio Técnico - Frontend

O propósito desse desafio é a criação de frontend para um quadro de kanban. Esse quadro possui listas, que contém cards.

As imagens abaixo são apenas uma ilustração da funcionalidade desejada:

![](https://s3-sa-east-1.amazonaws.com/lcpi/62b90509-8792-4fb1-9aa7-240f5a22c88e.png)

Com os dois primeiros cards em modo de edição:

![](https://s3-sa-east-1.amazonaws.com/lcpi/64875968-b03c-49b7-9c28-4d82b73e7d51.png)

Esse é um protótipo bem qualquer nota, sem estilo, nem considerações de UI e UX. 

Esperamos uma qualidade bem mais alta de seu trabalho.

## Rodando a API

Uma API de exemplo foi disponibilizada na pasta BACK.

Para rodá-la, faça:

```console
> cd BACK
> npm install
> npm run server
```

Ela responderá na porta 5000.

## Desafio

Você precisa criar um frontend de acordo com os requisitos abaixo, que deve ser desenvolvido na pasta "FRONT".

Para criar seu frontend você pode escolher entre duas tecnologias:

1. Javascript ou Typescript + REACT
2. Typescript + ANGULAR

## Requisitos

**Utilização da API**

A API que provemos nesse projeto utiliza JWT para autenticação, você deve fazer a seguinte requisição antes qualquer outra:

```
(POST) http://0.0.0.0:5000/login/

{ "login":"letscode", "senha":"lets@123"}
```

Feita a requisição você receberá um token em formato json. Esse token deve ser enviado em todas as requisições subsequentes pelo header Authorization de acordo com o padrão JWT.

```
Authorization : 'Bearer <token>'
```

Lembre-se de setar os headers Accept e ContentType para json em todas as requisições...

---

A API tem os seguintes entrypoints:

```
(GET)       http://0.0.0.0:5000/cards/
(POST)      http://0.0.0.0:5000/cards/
(PUT)       http://0.0.0.0:5000/cards/{id}
(DELETE)    http://0.0.0.0:5000/cards/{id}
```

---

**GET** obtém uma lista de cards.

A API retorna um array com o seguinte formato:

```
[
    {
        id:uuid
        titulo : string, 
        conteudo: string, 
        lista: string
    },
    ...
]
```

---

**POST** adiciona um novo card, passe-o pelo corpo da requisição com o seguinte formato:

```
{
    titulo : string, 
    conteudo: string, 
    lista: string
}
```

A api retornará o card completo como o id atribuído.

---

**PUT** altera um card existente, passe o id na URL e o card completo pelo corpo da requisição de acordo com o formato:

```
{
    id: uuid (o mesmo passado na URL)
    titulo : string, 
    conteudo: string, 
    lista: string
}
```

A api retornará o card completo que foi salvo.

---

**DELETE** remove um card existente, passe o id na URL.

A api retornará a lista dos cards que sobraram (igual ao GET).

```
[
    {
        id:uuid
        titulo : string, 
        conteudo: string, 
        lista: string
    },
    ...
]
```

---

**Atenção**: As rotas tem validações e retornos diferentes dependendo do resultado:

> POST e PUT retornam 400 se titulo, conteudo ou lista forem avaliados como falsy.
> 
> PUT também retorna 400 se o id passado na URL não for igual ao do objeto passado no corpo da requisição.
> 
> PUT e DELETE retornam 404 se não encontrarem um card com o id passado na URL.
> 
> Todas as rotas retornam 401 se o token não for passado, for inválido, mal-formado ou expirado.

## Requisitos

1. A API que provemos deve ser usada para persistência dos cards (ela trabalha com persistência em memória) e não deve ser alterada.

2. A interface gráfica será apenas uma tela, nela deve haver três colunas chamadas "To do", "Doing" e "Done". 

3. Os cards deve ser listados nessas colunas de acordo com o valor do campo `lista` presente no card. Os valores de `lista` devem ser "ToDo", "Doing" e "Done", respectivamente. 

4. Deve haver um local que permita criar um card passando valores para o `titulo` e `conteudo`, deve haver um botão para adicionar o card. 

5. Um novo card deve sempre cair na lista "To Do" após persistido na API.

6. O card deverá ter dois modos: Visualização e Edição.

7. No modo de visualização o card terá um cabeçalho com seu título, o conteúdo e 4 botões.

8. O `conteudo` do card pode ser markdown, utilize uma biblioteca para renderizá-lo no modo de visualização (recomendamos uma combinação de `dompurify` e `marked`). Lembre-se de estilizar o html resultante do parse do markdown... [Se quiser usar highlight para campos de código no markdown será um diferencial].

9.  Um dos botões do card deverá excluí-lo (persistindo pela API), outro colocá-lo em modo de edição.

10. Os dois outros botões devem mudar o card para a lista anterior (se houver) ou para a lista seguinte (se houver). A decisão de desabilitar, esconder ou apenas não gerar o evento desses botões quando não houver a proxima lista ou a anterior é sua.

11. No modo de edição, o card conterá um input para o `titulo`, um textarea para o `conteudo` e dois botões.

12. No modo de edição, um dos botões cancela a edição, quando precionado os campos devem ser resetados para o valor atual e voltar o card ao modo de visualização.

13. O outro botão salva o card, persistindo as informações pela API. Também volta ao modo de visualização em seguida.

14. Toda decisão de visual, de UI e UX é sua. Apenas utilize uma única tela. 

15. Se estiver usando REACT priorize componentes funcionais e hooks.

16. O projeto deve ser colocado em um repositório GITHUB ou equivalente, estar público, e conter um readme.md que explique em detalhes qualquer comando ou configuração necessária para fazer o projeto rodar.

17. A entrega será apenas a URL para clonarmos o repositório.

## Diferenciais e critérios de avaliação

Qualidade visual levando em conta práticas de UI e UX será considerado um diferencial. Bem como a instalação e bom uso de bibliotecas como styled-components e react-icons ou seus equivalentes para Angular se aplicável.

Arquiteturas que separem responsabilidades, de baixo acoplamento e alta-coesão são preferíveis, sobretudo usando dependências injetadas, que permitam maior facilidade para testes unitários e de integração.

Avaliaremos se o código é limpo (com boa nomenclatura de classes, variáveis, métodos e funções) e dividido em arquivos bem nomeados, de forma coesa e de acordo com boas práticas. Bem como práticas básicas como tratamento de erros.

Desacoplar e testar os componentes e serviços com testes unitários será considerado um diferencial.

O uso de typescript (se não for obrigatório) acompanhado das devidas configurações e tipagens bem feitas, bem como uso de técnicas de abstração usando interfaces (especialmente da lógica de persistência) serão consideradas um deferencial.

O uso de Linter será considerado um diferencial.

A criação de um docker-compose e de dockerfiles que ao rodar `docker-compose up` subam o sistema por completo (front e back) será considerado um diferencial.

Entregou incompleto, teve dificuldade com algo, ou fez algo meio esquisito para simplificar alguma coisa que não estava conseguindo fazer? Deixe uma observação com a justificativa no readme.md para nós...