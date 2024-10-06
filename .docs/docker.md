# Build
docker build -f apps/selfregulator/backend/Dockerfile -t selfreg-be .

# Run
docker run -p 3000:3000 selfreg-be

# Upload to Docker Hub
docker tag selfreg-be prenticez/selfreg-be:latest
docker push prenticez/selfreg-be:latest

# Need to figure out how to only take the node/modules from the app not the root
We can list our images with - use CMD not bash
```sh
  docker images
```
And look inside them with 
```sh
docker run -it <image_id> /bin/bash
```
