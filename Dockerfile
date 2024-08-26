# Use a base node image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Install dependencies for both frontend and backend
RUN npm install && npm install --prefix front-end

# Build the frontend
RUN npm run build --prefix front-end

# Expose ports (adjust based on what your frontend/backend are using)
EXPOSE 5000 5173

# Start the application
CMD ["npm", "start"]
