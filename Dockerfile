FROM node:20-buster-slim

USER root

# Expose the port the app runs in
EXPOSE 3000

# RUN npm install pm2 -g

ENV NODE_PATH=/usr/lib/node_modules

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/good-data

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/good-data

# Copy dependency definitions
ADD package.json /usr/src/good-data

# Install dependecies
RUN npm install -g typescript ts-node
RUN npm install --only=production --unsafe-perm=true

# Get all the code needed to run the app
ADD . /usr/src/good-data

# RUN NODE_ENV=staging-bci
CMD npm run start:staging