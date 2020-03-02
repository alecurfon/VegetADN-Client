#!/bin/bash

sudo apt -qq -y install npm
yes '' | sudo npm install npm@6.13 -g
yes '' | sudo npm install @angular/cli -g
yes '' | sudo npm update
#sudo npm install --save-dev @angular-devkit/build-angular
printf ">> Executing ...\n"
ng serve --open &
