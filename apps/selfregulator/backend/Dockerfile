# Stage 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /selfregulator

# Copy the root package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the Nx workspace and build the backend
COPY . .
RUN npx nx build selfregulator-backend

# Stage 2: Install production dependencies for backend
WORKDIR /selfregulator/dist/apps/selfregulator/backend
RUN npm install --production

# Stage 3: Create the production image
FROM node:18-alpine
WORKDIR /app

# Copy only the built files from the build stage
COPY --from=builder /selfregulator/dist/apps/selfregulator/backend /app

# Copy only the necessary production node_modules
COPY --from=builder /selfregulator/dist/apps/selfregulator/backend/node_modules /app/node_modules

# Start the Express app
CMD ["node", "main.js"]