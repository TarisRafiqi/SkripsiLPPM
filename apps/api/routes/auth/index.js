"use strict";

const groupMap = {
   0: "dosen",
   9: "admin",
   10: "reviewer",
   11: "Ka. Departemen",
   12: "Ka. LPPM",
   13: "Ka. Pusat Kajian",
};

module.exports = async function (fastify, opts) {
   fastify.post("/", async function (request, reply) {
      let { username, password } = request.body;
      const sql = `SELECT * from users WHERE username = ? AND password = ?`;
      let connection;
      let dbData;
      let token;
      let role;
      let id;
      let sukses = true;

      // reply.send(request.body);
      // return;

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [username, password]);
         dbData = {
            ...rows[0],
            role: groupMap[rows[0].role],
         };
         connection.release();
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
            error,
            sukses: false,
         });
      }

      // Membandingkan password yang dientry User dengan DB.
      if (password === dbData.password && username === dbData.username) {
         if (dbData.active) {
            token = fastify.jwt.sign({
               id,
               username,
               role,
            });
         } else {
            reply.send({
               msg: "Akun belum diaktifkan",
               sukses: false,
            });
         }
      } else {
         reply.send({
            msg: "Password tidak cocok",
            sukses: false,
         });
      }

      reply.send({
         ...dbData,
         token,
         sukses,
      });
   });
};
