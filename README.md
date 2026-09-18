# Pokédex Full Stack

Aplicação Full Stack desenvolvida para gerenciamento de Pokémons, utilizando Flask no Back-end e React no Front-end.

O projeto permite cadastrar, visualizar, atualizar, evoluir e excluir Pokémons através de uma interface inspirada no visual clássico da Pokédex.

## Funcionalidades

- Listagem de Pokémons
- Visualização dos detalhes de cada Pokémon
- Cadastro de novos Pokémons
- Atualização de nível
- Evolução de Pokémon
- Exclusão de Pokémon
- Cadastro de imagem através de URL
- Validação de dados no Front-end
- Tratamento de erros da API
- Mensagens de sucesso e erro
- Mensagens temporárias com timer
- Cache utilizando Redis
- Paginação da listagem
- Interface responsiva

## Tecnologias utilizadas

### Back-end

- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-CORS
- SQLite
- Redis
- Poetry

### Front-end

- React
- Vite
- React Router
- JavaScript
- HTML
- CSS

### Infraestrutura

- Docker
- Docker Compose
- Redis

## Estrutura do projeto

```text
TestFlask/
│
├── front-end/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── PokemonCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Detalhes.jsx
│   │   │   └── Cadastrar.jsx
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Detalhes.css
│   │   │   └── Cadastrar.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── migrations/
├── main.py
├── docker-compose.yml
├── Dockerfile
├── pyproject.toml
├── poetry.lock
└── README.md
```

## API

A API Flask possui endpoints para gerenciamento dos Pokémons.

### Listar Pokémons

```http
GET /pokemons
```

Retorna a lista de Pokémons cadastrados com suporte a paginação.

### Detalhes do Pokémon

```http
GET /detalhes/<id_pokemon>
```

Retorna os dados de um Pokémon específico.

### Cadastrar Pokémon

```http
POST /adicionar
```

Exemplo de dados enviados:

```json
{
  "nome_pokemon": "Pikachu",
  "tipo_pokemon": "Elétrico",
  "nivel_pokemon": 28,
  "imagem_pokemon": "https://exemplo.com/pikachu.png"
}
```

### Atualizar nível

```http
PUT /atualizar_nivel/<id_pokemon>
```

Exemplo:

```json
{
  "nivel_pokemon": 30
}
```

### Evoluir Pokémon

```http
PUT /evoluir/<id_pokemon>
```

Permite alterar os dados do Pokémon para representar sua evolução.

### Deletar Pokémon

```http
DELETE /deletar/<id_pokemon>
```

Remove o Pokémon do banco de dados.

## Redis

O Redis é utilizado como sistema de cache da aplicação.

A listagem de Pokémons pode ser armazenada temporariamente em cache, reduzindo consultas desnecessárias ao banco de dados.

Quando os dados são alterados através de operações de cadastro, atualização, evolução ou exclusão, o cache relacionado é invalidado para manter os dados atualizados.

## Como executar o projeto

Clone o repositório:

```bash
git clone URL_DO_SEU_REPOSITORIO
```

Entre na pasta:

```bash
cd TestFlask
```

### Back-end

Instale as dependências:

```bash
poetry install
```

Crie um arquivo `.env`:

```env
DATABASE_URL=sqlite:///./pokemons.db
```

Inicie o Redis através do Docker Compose:

```bash
docker compose up -d
```

Execute as migrations:

```bash
poetry run flask --app main db upgrade
```

Inicie a API:

```bash
poetry run flask --app main run
```

A API estará disponível em:

```text
http://127.0.0.1:5000
```

### Front-end

Entre na pasta:

```bash
cd front-end
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Front-end estará disponível em:

```text
http://localhost:5173
```

## Interface

A interface foi desenvolvida com inspiração na identidade visual da franquia Pokémon, utilizando elementos em vermelho, amarelo e azul.

A aplicação possui páginas para:

- visualização da Pokédex;
- detalhes de cada Pokémon;
- cadastro;
- atualização de nível;
- evolução;
- confirmação de exclusão.

O layout também possui adaptação para diferentes tamanhos de tela.

## Aprendizados

Durante o desenvolvimento deste projeto foram trabalhados conceitos como:

- Desenvolvimento de APIs REST com Flask
- Integração entre React e Flask
- Requisições HTTP utilizando Fetch API
- Operações CRUD
- React Router
- Hooks como `useState` e `useEffect`
- Validação de formulários
- Tratamento de respostas HTTP
- SQLAlchemy
- Migrations de banco de dados
- Cache com Redis
- CORS
- Variáveis de ambiente
- Docker
- Responsividade com CSS
- Git, branches e Pull Requests

## Autor

**Guilherme Zampar**

Desenvolvedor Full Stack Python em formação.

GitHub: GuilhermeAZampar
