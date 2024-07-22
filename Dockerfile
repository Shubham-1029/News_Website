# backend/Dockerfile

# Base image
FROM python:3.9

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy all files
COPY . .

# Expose port
EXPOSE 8000

# Run the app
CMD ["gunicorn", "News_Website.wsgi:application", "--bind", "0.0.0.0:8000"]
