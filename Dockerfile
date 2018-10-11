FROM node:8
# install sails
RUN npm -g install sails@.12.14
# create user node
# RUN useradd -c 'Node.js user' -m -d /home/node -s /bin/bash node
# USER node
# Create app directory
WORKDIR  /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json  /usr/src/app

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY .  /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
