#!/bin/bash -xe
echo 'Woot!' > /home/ec2-user/user-script-output0.txt
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install -y gcc-c++ make git docker nodejs
sudo service docker start
echo 'Woot1!' > /home/ec2-user/user-script-output1.txt
cd /home/ec2-user
node index
node server
echo 'Woot2!' > /home/ec2-user/user-script-output2.txt