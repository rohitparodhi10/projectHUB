FROM node:20 as build-stage

WORKDIR /code

COPY ./project_front/ /code/project_front/

WORKDIR /code/project_front

# Installing packages

RUN npm install

# Building the frontend

RUN npm run build

# Stage 2:Build Backend

FROM python:3:11:4

# Set Environment Variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

WORKDIR /code

# Copy django project to the container
COPY ./projecthub/ /code/projecthub/

RUN pip install -r ./projecthub/requirements.txt

COPY --from=build-stage ./code/project_front/build /code/projecthub/static/
COPY --from=build-stage ./code/project_front/build/static /code/projecthub/static/
COPY --from=build-stage ./code/project_front/build/index.html /code/projecthub/templates/index.html

# Run django migration command
RUN python ./projecthub/manage.py migrate

# Run django collectstatic command
RUN python ./projecthub/manage.py collectstatic --no-input

# Expose port
EXPOSE 80

WORKDIR /code/projecthub

# Run the django server
CMD [ "gunicorn", "projecthub.wsgi:application","--bind","0.0.0.0:8000"]

 