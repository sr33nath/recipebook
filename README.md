# Recipebook
To run recipebook on your PC or Laptop requires below software.

## Requirements:

Ubuntu 20.04

kubectl
```
Client Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.2", GitCommit:"8b5a19147530eaac9476b0ab82980b4088bbc1b2", GitTreeState:"clean", BuildDate:"2021-09-15T21:38:50Z", GoVersion:"go1.16.8", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.1", GitCommit:"632ed300f2c34f6d6d15ca4cef3d3c7073412212", GitTreeState:"clean", BuildDate:"2021-08-19T15:39:34Z", GoVersion:"go1.16.7", Compiler:"gc", Platform:"linux/amd64"}
```

minikube
```
minikube version: v1.23.1
commit: 84d52cd81015effbdd40c632d9de13db91d48d43
```

docker

```
Client: Docker Engine - Community
Version:           20.10.8
API version:       1.41
Go version:        go1.16.6
Git commit:        3967b7d
Built:             Fri Jul 30 19:54:27 2021
OS/Arch:           linux/amd64
Context:           default
Experimental:      true

Server: Docker Engine - Community
Engine:
Version:          20.10.8
API version:      1.41 (minimum version 1.12)
Go version:       go1.16.6
Git commit:       75249d8
Built:            Fri Jul 30 19:52:33 2021
OS/Arch:          linux/amd64
Experimental:     false
containerd:
Version:          1.4.9
GitCommit:        e25210fe30a0a703442421b0f60afac609f950a3
runc:
Version:          1.0.1
GitCommit:        v1.0.1-0-g4144b63
docker-init:
Version:          0.19.0
GitCommit:        de40ad0
```

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

Output would look something like below.

```
NAME                 CLASS    HOSTS   ADDRESS        PORTS   AGE
recipebook-ingress   <none>   *       <ip-address>   80      4h21m
```

Copy the IP address from the above output and paste the IP address in your browser. You will be able to see the landing page of the app.

`http://<ip-address>`

## API Documentation
Paste below URL into your browser

`http://<ip-address>/swagger-ui/`


## App deployment architecture

![App architecture](https://github.com/sreenathisapro/recipebook/blob/develop/kube/recipebook-deployment.jpg?raw=true)