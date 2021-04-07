#!/bin/bash

#if [ "$EUID" -ne 0 ]
#  then echo "Please run as root"
#  exit
#fi
#
#apt install curl
#apt install python3-pip 
#apt install python3-venv
#
#curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#apt update
#apt install yarn
#cd client
#yarn

cd ../server
pip install Flask
pip install plotly
pip install pandas
pip install matplotlib
pip install seaborn
pip install networkx
pip install flask_cors

