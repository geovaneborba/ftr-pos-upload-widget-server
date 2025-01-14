import fastify from "fastify";
import fastifyCors from "@fastify/cors";

const server = fastify();

server.register(fastifyCors, {
  origin: "*",
});

const port = 3333;

server
  .listen({
    port,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`HTTP Server is running on port ${port} 🚀🔥`);
  });
