#!/bin/bash

sudo apt install curl
sudo apt install python3-pip 
sudo apt install python3-venv

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
cd client
yarn

cd ../server
pip install Flask
pip install plotly
pip install pandas
pip install matplotlib
pip install seaborn
pip install networkx
pip install flask_cors

