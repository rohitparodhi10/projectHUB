# ---------- FRONTEND BUILD ----------
FROM node:20 AS frontend-build

WORKDIR /code/project_front

COPY ./project_front/package*.json ./
RUN npm install

COPY ./project_front/ ./
RUN npm run build

# ---------- BACKEND BUILD ----------
FROM python:3.11.4

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1

WORKDIR /code

RUN apt-get update && apt-get install -y gcc python3-dev default-libmysqlclient-dev

COPY ./projecthub/requirements.txt ./projecthub/
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r ./projecthub/requirements.txt

COPY ./projecthub/ /code/projecthub/

# Copy frontend build output for Django static files
COPY --from=frontend-build /code/project_front/dist /code/projecthub/static/
COPY --from=frontend-build /code/project_front/dist/index.html /code/projecthub/templates/index.html

EXPOSE 8000

WORKDIR /code/projecthub

# Start the server by default (no migrate in Dockerfile)
CMD ["gunicorn", "projecthub.wsgi:application", "--bind", "0.0.0.0:8000"]
