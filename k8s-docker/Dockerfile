# docker image is working layer by layer, there is caching of result of each layer
# making an image so that anyone can use it with same version and code
# based on node with version 15
FROM node:15
# every commands now will execute in WORKDIR
WORKDIR /app
# . means current directory, here it is /app
# copy package.json and running num install will install node_modules 
# so we dont have to copy node_modules and package.json don't changes continously so 
# due to chaching this layer not re work or fetch - optimization
COPY package.json .
# this is runtime
RUN npm install
# copying everything from current directory to /app current directory
COPY . ./
# PORT, here the 8080 is the port of container
EXPOSE 8080
# executable command
# this is buildtime, it works when container runs
# [CMD [ "node", "index.js" ]
CMD [ "npm", "run", "dev" ]


# commands - 
# ``` docker build . ```
# ``` docker build -t image_name . ``` - giving name to image
# ``` docker image ls ``` - availabe image docker 
# ``` docker image rm image_id ``` - deleting the docker
# ``` docker run -d --name container_name image_name ```
# ``` docker ps ``` gives the current running container
# ``` docker stop container_id ```
# ``` docker run -d -p 8085:8080 image_name ``` running docker and connect with our local machine port
# here -d means detach mode means there will be no logs
# ``` docker exec -it container_name bash ``` moving ito the container
# ``` docker run -d -v -p localMachineFolder: folderContainer 8085:8080 image_name ```  it will sync the data as volume
# ``` docker ps -a ``` it gives us all the container
# ``` docker log container_name ``` it gives us all the logs
# ``` docker run -d -p 8085:8080 --name node_app_container node_app ```
# ``` docker stop container id ```
# ``` docker rm container_name -f ```
# ``` docker run -d -p 8085:8050 -v pathtofolderonlocation:pathtofolderoncontainer --name node_app_container_ node_app ``` syincing the volume
# ``` docker run -d -p 8085:8050 -v $(pwd):/app --name node_app_container_ node_app ``` syincing the volume
# here the files will change internally of container according to our local machine due to syncing
# but to run again we need nodemon ...

# we don't wnat there is syncing of node_modules in container by local folder
# ``` docker run -d -p 8085:8080 -v $(pwd):/app -v /app/node_modules --name node_app_container node_app ```
# now the problem is docker changing our local file also - we can make read only bymount
# ``` docker run -d -p 8085:8080 -v $(pwd):/app:ro -v /app/node_modules --name node_app_container node_app ```
