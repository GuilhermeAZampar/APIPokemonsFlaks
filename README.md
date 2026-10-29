 Pokédex Full Stack

Desenvolvi esta aplicação para organizar e gerenciar uma coleção de Pokémons, com cadastro, consulta de detalhes, atualização de níveis, evolução e exclusão de registros.

Implementei a API com Python, Flask, SQLAlchemy e SQLite, utilizando Redis para cache da listagem. Criei a interface com React, Vite e React Router, com visual inspirado na Pokédex, paginação, validação de formulários e layout responsivo.

Para testar localmente, crie um arquivo `.env` com a configuração do banco:

```env
DATABASE_URL=sqlite:///./pokemons.db
```

Instale as dependências, inicie o Redis, aplique as migrations e execute a API:

```bash
poetry install
docker compose up -d
poetry run flask --app main db upgrade
poetry run flask --app main run
```

Em outro terminal, execute o front-end:

```bash
cd front-end
npm install
npm run dev
```

Acesse a interface em http://localhost:5173. A API ficará disponível em http://127.0.0.1:5000.

Desenvolvido por [Guilherme Zampar](https://github.com/GuilhermeAZampar).
