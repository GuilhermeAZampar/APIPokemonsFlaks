FROM python:3.14-slim

WORKDIR /app

COPY . .

RUN pip install poetry

RUN poetry config virtualenvs.create false

RUN poetry install --no-root

EXPOSE 5000

CMD ["python","main.py"]