# Step 1: Use an official lightweight Node.js runtime image (The JRE equivalent)
FROM node:22-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy build configurations (The pom.xml equivalent)
COPY package*.json ./

# Step 4: Install dependencies inside the container clean slate
# (Using 'npm ci' instead of 'npm install' ensures clean, reproducible production builds)
RUN npm ci --only=production

# Step 5: Copy the actual application folders
COPY src/ ./src
COPY web/ ./web

# Step 6: Expose the port your Express server listens on
EXPOSE 3000

# Step 7: Define the command to start your application inside the container
CMD [ "node", "src/app.js" ]

