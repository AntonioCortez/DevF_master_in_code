#Antonio Cortez @kacorius 07/2021
#For create a NodeJS image with Global Live-server
#for more information about Live-server go to
#https://www.npmjs.com/package/live-server
from node:15.5.0-buster
RUN npm install -g live-server
expose 8080