sudo apt -qq -y install npm
sudo npm install npm@6.13 -g
sudo npm install @angular/cli -g
sudo npm update -g
printf ">> Executing ..."
ng serve --open >/dev/null 2>&1 &
