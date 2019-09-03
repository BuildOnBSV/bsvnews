#!/bin/bash -x
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install -y gcc-c++ make git docker nodejs
sudo service docker start
cd /home/ec2-user
sudo docker stop mongo
sudo docker rm mongo
sudo docker stop app
sudo docker rm app
sudo rm tape.txt
sudo node index &>/dev/null &
sudo node server &>/dev/null &
