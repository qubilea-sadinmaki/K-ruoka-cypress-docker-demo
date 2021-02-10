# FROM cypress/included:6.1.0
FROM cypress/browsers:node12.18.3-chrome87-ff82
ARG my_workdir=/e2e
WORKDIR ${my_workdir}

COPY ./ ${my_workdir}

RUN npm install && npm audit fix

RUN npm install --save-dev cypress@6.1.0
