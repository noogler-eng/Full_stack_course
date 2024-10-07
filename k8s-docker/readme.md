## k8s
 - ``` Automatic deployment ``` of the containerized applications across different servers
 - ``` Distribution of load ``` accross multiple servers
 - ``` Auto-sacling ``` of deployed applications
 - ``` Monitoring and health check ``` of the containers
 - ``` Replacment ``` of failed containers

 - ``` POD ``` smallest unit in k8's world while ``` container ``` in docker world
 - ``` POD >> [containers] + shared volume + shared IP address ``` 
 - multiple containes can be created inside a single pod
 - it can't possible to spread one container among many pods
 - ``` cluster >> [multiple servers \ nodes] >> [pods] >> [containers] ```
 - after some initial configration everything will be automated like automatically deploy
 - ``` k8s cluster >> master node + [worker nodes] ``` master node is controller of all cluster
 - ``` kubectl ``` is command line tool to manage cluster remotely
 - ``` kubectl interacts with api service of master node ``` connection is over HTTPs
 - pods can be deleted or formed any time. company assigns pods to their workers to handel containers.
 - conatiner manager / virtual machine -> docker
 - kubernetes cluster -> minikube
 
## commands
 - ``` kubectl version --client ```
 - ``` minikube start --driver=docker ```
 - ``` minicube ip ``` address assigned to cluster node
 - ``` ssh docker@ip_address ``` default password for minikube is tcuser while username is docker, now we are inside server
 - ``` docker ps ``` gives all running docker containers
 - kubectl is only working outside the node or cluster
 - ``` kubectl cluster info ``` 
 - ``` kubectl get nodes ```
 - ``` kubectl get pods ```
 - ``` kubectl get namespaces ``` 