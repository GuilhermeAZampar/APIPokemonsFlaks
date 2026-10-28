Pokédex Full Stack

Desenvolvi este projeto com Flask e React para cadastrar e gerenciar Pokémons. A aplicação permite consultar detalhes, atualizar níveis, registrar evoluções e excluir registros, com uma interface inspirada no visual clássico da Pokédex.

No back-end, utilizei Python, Flask, SQLAlchemy e SQLite, além de Redis para cache da listagem. O front-end foi feito com React, Vite e React Router, com paginação, validação de formulários, mensagens de sucesso e erro e layout responsivo.

Para executar o back-end, instale as dependências:

poetry install

Crie um arquivo .env com a configuração do banco:

DATABASE_URL=sqlite:///./pokemons.db

Inicie o Redis, aplique as migrations e execute a API:

docker compose up -d
poetry run flask --app main db upgrade
poetry run flask --app main run

Em outro terminal, execute o front-end:

cd front-end
npm install
npm run dev

A API ficará disponível em http://127.0.0.1:5000 e a interface em http://localhost:5173.

Desenvolvido por Guilherme Zampar.
