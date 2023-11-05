"use strict";

const groupMap = {
   0: "dosen",
   9: "admin",
   10: "reviewer",
   11: "Ka. Departemen",
   12: "Ka. LPPM",
   13: "Ka. Pusat Kajian",
};

const clientId =
   "6224320891-rv1khlf2774a4qrqdci4aju61nlvgdsa.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUrl = "http://localhost:3000/api/auth/google/callback";

const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
   clientId,
   clientSecret,
   redirectUrl
);
const scopes = [
   "https://www.googleapis.com/auth/userinfo.email",
   "https://www.googleapis.com/auth/userinfo.profile",
];

module.exports = async function (fastify, opts) {
   fastify.get("/google", async function (request, reply) {
      const authorizationUrl = oauth2Client.generateAuthUrl({
         access_type: "offline",
         scope: scopes,
         include_granted_scopes: true,
      });
      reply.redirect(authorizationUrl);
      // reply.send({
      //    sukses: "sukses",
      // });
   });

   fastify.get("/google/callback", async function (request, reply) {
      //
      const { code } = request.query;
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({
         auth: oauth2Client,
         version: "v2",
      });

      const { data } = await oauth2.userinfo.get();

      reply.send({ data });
   });

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
