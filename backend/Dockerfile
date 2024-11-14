FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml poetry.lock /app/

RUN pip install poetry
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc

RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

COPY . /app

EXPOSE 8000

CMD ["poetry", "run", "python3", "run.py"]
