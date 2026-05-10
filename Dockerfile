# Stage 1: Build the Application 
FROM node:20-alpine AS builder
# Create app directory 
WORKDIR /app
# Copy package files first
COPY package*.json ./
# Install Dependencies
RUN npm install
# Copy source code 
COPY . .
# Build the Project
RUN npm run build
# Stage 2: Serve using Nginx 
FROM nginx:stable-alpine
# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*
# Copy build output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
