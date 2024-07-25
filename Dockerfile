# backend/Dockerfile

# Base image
FROM python:3.10

# Set working directory
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


# Copy all files
COPY . .

EXPOSE 8000

# Run the app
CMD ["/bin/bash", "-c", "python manage.py runserver 0.0.0.0:8000"]
