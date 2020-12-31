FROM cypress/included:5.3.0
ARG my_workdir=/e2e
WORKDIR ${my_workdir}

COPY ./ ${my_workdir}

RUN npm install && npm audit fix

# docker build -t k-demo . && docker run k-demo --browser chrome
