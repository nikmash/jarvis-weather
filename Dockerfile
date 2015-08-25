FROM gliderlabs/alpine:3.1
RUN apk --update add bash nodejs git
WORKDIR /app

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --no-optional
RUN cp -R /tmp/node_modules /app/

ADD . .
CMD npm start
