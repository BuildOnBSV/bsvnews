#!/bin/bash -x
echo 'Woot!' > /home/ec2-user/user-script-output0.txt
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install -y gcc-c++ make git docker nodejs
sudo service docker start
echo 'Woot1!' > /home/ec2-user/user-script-output1.txt
cd /home/ec2-user
sudo docker stop mongo || true
sudo docker rm mongo || true
sudo docker stop app || true
sudo docker rm app || true
sudo rm tape.txt || true
sudo node index &>/dev/null &
sudo node server &>/dev/null &
echo 'Woot2!' > /home/ec2-user/user-script-output2.txt
