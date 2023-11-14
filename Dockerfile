#Creates a layer from node:alpine image.
FROM node:20.6-alpine3.18

#Sets an environment variable
ENV PORT 3000

ARG MONGODB_USER
ARG MONGODB_PASSWORD
ARG MONGODB_CLUSTER

ENV MONGODB_USER ${MONGODB_USER}
ENV MONGODB_PASSWORD ${MONGODB_PASSWORD}
ENV MONGODB_CLUSTER ${MONGODB_CLUSTER}

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/src/app

#Copy new files or directories into the filesystem of the container
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

#Execute commands in a new layer on top of the current image and commit the results
RUN npm ci --only=production && npm cache clean --force

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/app

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3000

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "run"]