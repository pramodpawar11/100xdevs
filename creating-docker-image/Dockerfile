# Use a specific version of ubuntu for a more stable and predictable environment
FROM ubuntu:20.04

# Install curl and Node.js in a single RUN layer to reduce image size
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Copying package.json and package-lock.json together allows for better caching
COPY package*.json ./

# Copy the main.js file into the working directory
COPY main.js .

# Install npm dependencies
RUN npm install

# Set the entrypoint to run your application
ENTRYPOINT ["node", "main.js"]

