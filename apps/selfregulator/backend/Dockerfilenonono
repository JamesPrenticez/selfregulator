# Stage 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /selfregulator

# Copy the root package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the Nx workspace and build the app
COPY . .
RUN npx nx build selfregulator-backend

# Stage 2: Create the production image
FROM node:18-alpine
WORKDIR /app

# Copy only the built files from the builder stage
COPY --from=builder /selfregulator/dist/apps/selfregulator/backend /app

# Copy only the necessary production node_modules
COPY --from=builder /selfregulator/node_modules /app/node_modules

# Start the Express app
CMD ["node", "main.js"]

# Build
# docker build -f apps/selfregulator/backend/Dockerfile -t selfreg-be .
# Run
# docker run -p 3000:3000 selfreg-be
# Need to figure out how to only take the node/modules from the app not the root
# Upload to Docker Hub
# docker tag selfreg-be prenticez/selfreg-be:latest
# docker push prenticez/selfreg-be:latest
