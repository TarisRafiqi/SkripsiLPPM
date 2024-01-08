("use strict");

const { readFileSync } = require("fs");
const fs = require("fs/promises");
const path = require("path");

module.exports = async function (fastify, opts) {
   // Upload File
   fastify.get("/", async function (request, reply) {
      // const token = request.headers.authorization;
      // const decodedToken = fastify.jwt.decode(token);
      // const usernameFromToken = decodedToken.username;

      const namafile = "test";
      let filePath = "./upload/rab-" + namafile + ".xlsx";
      // filePath = path.join(__dirname, filePath);

      try {
         const data = await fs.readFile(filePath);
         reply.send({
            data,
         });
      } catch (error) {
         reply.send({
            error,
         });
      }
   });

   fastify.post("/", async function (request, reply) {
      const data = await request.file();
      const namafile = "test";
      const filePath = "./upload/rab-" + namafile + ".xlsx";
      try {
         const buffer = await data.toBuffer();
         fs.writeFile(filePath, buffer)
            .then(() => {
               console.log("Buffer has been written to file successfully");
            })
            .catch((err) => {
               console.error("Error:", err);
            });
      } catch (err) {
         // fileSize limit reached!
      }
      reply.send({
         data: "test",
      });

      return;
   });
};
