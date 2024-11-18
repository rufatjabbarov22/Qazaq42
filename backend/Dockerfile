FROM python:3.12-slim

ENV POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    libpq-dev \
    gcc && \
    curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml poetry.lock /app/

RUN poetry install --no-dev --no-ansi

COPY . /app

EXPOSE 8000

CMD ["poetry", "run", "python3", "run.py"]
