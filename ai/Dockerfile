FROM python:3.11-slim

WORKDIR /ai

RUN apt-get update && apt-get install -y curl \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="/root/.local/bin:$PATH"

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false \
    && poetry install --no-root --no-interaction --no-ansi

COPY . .

EXPOSE 8080

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
