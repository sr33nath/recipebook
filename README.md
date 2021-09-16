# Recipebook
To run recipebook on your PC or Laptop requires below software.

## Requirements:

Ubuntu 20.04

kubectl

minikube

docker

Once these are installed we are ready to go.

First we need to download the UI and API app images for recipebook. Both are hosted on Docker hub.

Execute below commands to do so.

`docker pull sreenathofficial/recipebook-api:0.0.1`

`docker pull sreenathofficial/recipebook-ui:0.0.1`

`docker pull mongo`

Then clone the repo from GitHub

`git clone https://github.com/sreenathisapro/recipebook.git`

Then checkout the develop branch

`git checkout develop`

`cd recipebook/kube`

Verify if minikube is started. If not run below command

`minikube start`

Execute below kubectl commands to get the app running

`kubectl apply -f mongo-pvc.yaml`

`kubectl apply -f mongo-deploy.yaml`

`kubectl apply -f mongo-svc.yaml`

`kubectl apply -f recipebook-api-deploy.yaml`

`kubectl apply -f recipebook-api-svc.yaml`

`kubectl apply -f recipebook-ui-deploy.yaml`

`kubectl apply -f recipebook-ui-svc.yaml`

`kubectl apply -f recipebook-ingress.yaml`

Once all the pods are in the running state, execute below command

`kubectl get ingress`

Copy the IP address from the output of the above command

Paste the IP address in your browser. You will be able to see the landing page of the app.

## App deployment architecture

![App architecture](https://github.com/sreenathisapro/recipebook/blob/develop/kube/recipebook-deployment.jpg?raw=true)