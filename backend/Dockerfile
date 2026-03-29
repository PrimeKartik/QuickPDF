# Use Debian Bullseye slim as a base which reliably supports LibreOffice headless
FROM node:20-bullseye-slim

# Install LibreOffice headless for Word to PDF conversions
# We use --no-install-recommends to keep the image size as small as possible
RUN apt-get update && \
    apt-get install -y --no-install-recommends libreoffice-core libreoffice-writer default-jre && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy dependency configs first (optimizes Docker caching)
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy all the rest of the backend files
COPY . .

# Explicitly set the path to the Linux soffice binary for libreoffice-convert
ENV SOFFICE_BINARY="/usr/bin/soffice"

# Open the port that Railway/Render will assign (or default to 3001)
EXPOSE 3001

# Command to start the server
CMD ["node", "server.js"]
