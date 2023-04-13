FROM python:3.11
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1
WORKDIR /code
COPY poetry.lock pyproject.toml /code/
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev
COPY . /code/