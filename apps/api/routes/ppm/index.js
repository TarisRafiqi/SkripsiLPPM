"use strict";

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   // Get detail proposal
   fastify.get("/:id", async function (request, reply) {
      const id = Number(request.params.id);
      let dbData;
      let connection;
      const sql = "SELECT * FROM ppm WHERE id = ?";
      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [id]);
         dbData = rows[0];
         connection.release();
         reply.send({
            ...dbData,
         });
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
         });
      }
   });

   // Reseach by Id
   fastify.get("/:id/:uid", async function (request, reply) {
      // id hanya hiasan, agar bisa membuat 2 GET didalam 1 API
      const uid = Number(request.params.uid);
      let dbData;
      let connection;
      const sql = "SELECT * FROM ppm WHERE uid = ?";
      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [uid]);
         dbData = rows;
         connection.release();
         reply.send({
            dbData,
         });
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
         });
      }
   });

   // Get all research
   fastify.get("/", async function (request, reply) {
      let dbData;
      const sql = "SELECT id, uid, judul, abstrak, status FROM ppm";
      let connection;

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, []);
         dbData = rows;
         connection.release();
         reply.send({
            dbData,
         });
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
         });
      }
   });

   fastify.post("/", async function (request, reply) {
      let data = request.body;
      const sql =
         "INSERT INTO ppm (uid, judul, abstrak, status) values(?, ?, ?, ?)";
      let connection;

      try {
         connection = await fastify.mysql.getConnection();
         await connection.query(sql, [
            data.id,
            data.judul,
            data.abstrak,
            data.status,
         ]);
         connection.release();
         reply.send({
            msg: "Sukses Menambahkan Proposal",
         });
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
            error,
         });
      }
   });

   // edit
   fastify.patch("/", async function (request, reply) {
      let dbData;
      let connection;
      let data = request.body;
      const sql =
         "UPDATE ppm SET judul = ?, abstrak = ?, comment = ?, status = ?, uid_kdept = ?, uid_klppm = ?, uid_kpk = ?, uid_reviewer = ? WHERE id = ?";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [
            data.judul,
            data.abstrak,
            data.comment,
            data.status,
            data.kdeptSelected,
            data.klppmSelected,
            data.kpkSelected,
            data.reviewerSelected,
            data.id,
         ]);
         dbData = rows;
         connection.release();
         reply.send({
            dbData,
         });
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
         });
      }
   });
};
