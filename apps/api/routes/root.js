module.exports = async (fastify, opts) => {
   // create
   fastify.post("/", async (request, reply) => {
      const payload = {
         method: "POST",
         msg: "Create post data",
         ...request.body,
      };
      reply.send(payload);
   });

   // read
   fastify.get("/", async (request, reply) => {
      const payload = {
         method: "GET",
         msg: "Read post data.",
      };
      reply.send(payload);
   });

   // update
   fastify.patch("/", async (request, reply) => {
      const payload = {
         method: "PATCH",
         msg: "Edit post data",
         ...request.body,
      };
      reply.send(payload);
   });

   // delete
   fastify.delete("/", async (request, reply) => {
      const payload = {
         method: "DELETE",
         msg: "Delele post data",
         ...request.body,
      };
      reply.send(payload);
   });
};
