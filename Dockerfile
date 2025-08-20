FROM node:20 as build-stage

WORKDIR /code/project_front

# Installing packages
COPY ./project_front/package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY ./project_front/ ./
# Building the frontend

RUN npm run build

# Debug: List files in build directory for confirmation
RUN ls -al /code/project_front/build

# Stage 2:Build Backend

FROM python:3.11.4

# Set Environment Variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

WORKDIR /code

# Install backend dependencies
COPY ./projecthub/requirements.txt ./projecthub/requirements.txt
RUN pip install -r ./projecthub/requirements.txt

# Copy backend source
COPY ./projecthub/ /code/projecthub/

COPY --from=build-stage /code/project_front/build /code/projecthub/static/
COPY --from=build-stage /code/project_front/build/index.html /code/projecthub/templates/index.html

# Run django migration command
RUN python ./projecthub/manage.py migrate

# Run django collectstatic command
RUN python ./projecthub/manage.py collectstatic --no-input

# Expose port
EXPOSE 8000

WORKDIR /code/projecthub

# Run the django server
CMD [ "gunicorn", "projecthub.wsgi:application", "--bind", "0.0.0.0:8000"]

 