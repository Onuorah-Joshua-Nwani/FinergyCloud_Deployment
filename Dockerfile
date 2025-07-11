FROM node:18-alpine
WORKDIR /app
COPY index.js .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "index.js"]