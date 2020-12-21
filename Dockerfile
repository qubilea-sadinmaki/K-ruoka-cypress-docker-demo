FROM cypress/included:5.3.0

WORKDIR /e2e

COPY ./ /e2e

RUN npm install

