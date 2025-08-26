# Stage 1: Build React frontend using Vite
FROM node:20 AS frontend-build
WORKDIR /code/project_front
COPY ./project_front/package*.json ./
RUN npm install
COPY ./project_front/ ./
RUN npm run build

# Stage 2: Build Django backend
FROM python:3.11.4
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1
WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y gcc python3-dev default-libmysqlclient-dev

# Install Python dependencies
COPY ./projecthub/requirements.txt ./projecthub/
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r ./projecthub/requirements.txt

# Copy Django project
COPY ./projecthub/ /code/projecthub/

# Create static directory structure
RUN mkdir -p /code/projecthub/static/assets
RUN mkdir -p /code/projecthub/staticfiles

# Copy frontend build files to the correct static directory
COPY --from=frontend-build /code/project_front/dist/assets /code/projecthub/static/assets
COPY --from=frontend-build /code/project_front/dist/pictures /code/projecthub/static/pictures
COPY --from=frontend-build /code/project_front/dist/index.html /code/projecthub/templates/index.html

# Set working directory
WORKDIR /code/projecthub

# Collect static files
RUN python manage.py collectstatic --noinput --clear

# Verify static files were collected (for debugging)
RUN echo "=== Checking static files ===" && \
    ls -la /code/projecthub/ | grep static && \
    ls -la /code/projecthub/staticfiles/ || echo "No staticfiles directory found"

# Expose port
EXPOSE 8000

# Start the application
CMD ["gunicorn", "projecthub.wsgi:application", "--bind", "0.0.0.0:8000"]