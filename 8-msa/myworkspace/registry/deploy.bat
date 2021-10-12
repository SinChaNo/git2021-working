scp -i "G:\keyfile\gateway.pem" -r ./build/libs/*.jar ubuntu@ec2-15-164-230-178.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/registry
scp -i "G:\keyfile\gateway.pem" -r ./run.sh ubuntu@ec2-15-164-230-178.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/registry
ssh -i "G:\keyfile\gateway.pem" ubuntu@ec2-15-164-230-178.ap-northeast-2.compute.amazonaws.com "sudo chmod 777 /home/ubuntu/app/registry/run.sh"
ssh -i "G:\keyfile\gateway.pem" ubuntu@ec2-15-164-230-178.ap-northeast-2.compute.amazonaws.com "cd /home/ubuntu/app/registry; ./run.sh registry"


