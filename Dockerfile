# base image
FROM node:11.2.0

# set working directory
RUN mkdir /usr/src/headshot_printing
WORKDIR /usr/src/headshot_printing

# add `/usr/src/headshot_printing/node_modules/.bin` to $PATH
ENV PATH /usr/src/headshot_printing/node_modules/.bin:$PATH

# install and cache headshot_printing dependencies
COPY package.json /usr/src/headshot_printing/package.json
COPY . /usr/src/headshot_printing
RUN cd /usr/src/headshot_printing/
RUN yarn install
RUN yarn run build

EXPOSE 3000

# start app
CMD ["yarn", "start"]
