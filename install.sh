#!/bin/bash

# if [ "$EUID" -ne 0 ]
#   then echo "Please run as root"
#   exit
# fi
# 
# apt install curl
# apt install python3-pip 
# apt install python3-venv
# 
# curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# apt update
# apt install yarn
# cd client
# yarn

pip3 install Flask
pip3 install plotly
pip3 install pandas
pip3 install matplotlib
pip3 install seaborn
pip3 install networkx
pip3 install flask_cors

