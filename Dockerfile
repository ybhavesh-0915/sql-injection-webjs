# better-sqlite3 ke prebuilt binaries hain, isliye build-tools nahi chahiye
# (agar npm install pe compile error aaye to neeche wali 3 lines uncomment kar dena)
FROM node:22-slim

# RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
#   && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY public/ ./public/
COPY server.js ./

# purani local .db copy mat karo, container start pe fresh banegi
ENV HOST=0.0.0.0 PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
