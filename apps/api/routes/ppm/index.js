"use strict";

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   // API ini diakses oleh halaman Detail Proposal untuk meminta detail proposal dari id tsb
   // Get detail proposal
   fastify.get("/:id", async function (request, reply) {
      const id = Number(request.params.id);
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);
      const idFromToken = decodedToken.id;
      const roleFromToken = decodedToken.role;
      let dbData;
      let connection;

      if (
         roleFromToken === "admin" ||
         roleFromToken === "dosen" ||
         roleFromToken === "reviewer" ||
         roleFromToken === "Ka.Departemen" ||
         roleFromToken === "Ka.LPPM" ||
         roleFromToken === "Ka.PusatKajian"
      ) {
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
      } else {
         reply.send({
            msg: "Anda tidak memiliki hak akses halaman ini",
         });
      }
   });

   // API ini diakses oleh halaman List Proposal untuk mengambil semua proposal/penelitian milik id tersebut.
   // Reseach by Id
   fastify.get("/:id/:uid", async function (request, reply) {
      // id hanya hiasan, agar bisa membuat 2 GET didalam 1 API
      const uid = Number(request.params.uid);
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);
      const idFromToken = decodedToken.id;
      const roleFromToken = decodedToken.role;
      let dbData;
      let connection;

      // reply.send({
      //    token,
      //    decodedToken,
      //    uid,
      //    idFromToken,
      // });
      // return;

      // if (roleFromToken === "dosen") {
      //    console.log("yes, this account role is dosen");
      //    // fungsi selanjutnya atau beri data ke FE
      // } else {
      //    reply.send({
      //       pesan: "Anda tidak memiliki hak akses halaman ini",
      //    });
      //    console.log("this role account is not dosen");
      // }

      if (idFromToken === uid) {
         const sql = "SELECT * FROM ppm WHERE uid = ?";
         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [uid]);
            dbData = rows;
            connection.release();

            reply.send({
               // token,
               // decodedToken,
               // uid,
               // idFromToken,
               dbData,
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db",
            });
         }
      }
   });

   // Get all research
   fastify.get("/", async function (request, reply) {
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);
      // const idFromToken = decodedToken.id;
      const roleFromToken = decodedToken.role;

      const sql = "SELECT id, uid, judul, abstrak, status FROM ppm";
      let dbData;
      let connection;

      // reply.send({
      //    token,
      //    decodedToken,
      //    idFromToken,
      // });
      // return;

      if (roleFromToken === "admin") {
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
      } else {
         reply.send({
            pesan: "anda tidak memiliki hak akses halaman ini",
         });
      }
   });

   fastify.post("/", async function (request, reply) {
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);
      // const idFromToken = decodedToken.id;
      const roleFromToken = decodedToken.role;

      let data = request.body;

      // reply.send({
      //    data,
      // });
      // return;

      const sql =
         "INSERT INTO ppm (uid, judul, abstrak, isi, status, jenis_proposal, jenis_kegiatan, jenis_skema, kelompok_keahlian, topik, rab, tahun_pelaksanaan) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      let connection;

      if (
         roleFromToken === "admin" ||
         roleFromToken === "dosen" ||
         roleFromToken === "reviewer" ||
         roleFromToken === "Ka.Departemen" ||
         roleFromToken === "Ka.LPPM" ||
         roleFromToken === "Ka.PusatKajian"
      ) {
         try {
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [
               data.id,
               data.judul,
               data.myAbstract,
               data.myIsi,
               data.status,
               data.jenisProposal,
               data.jenisKegiatan,
               data.jenisSkema,
               data.kelompokKeahlian,
               data.Topik,
               // data.anggotaTim,
               data.rab,
               data.tahunPelaksanaan,
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
      } else {
         reply.send({
            msg: "anda tidak memiliki hak akses halaman ini",
            error,
         });
      }
   });

   // edit
   fastify.patch("/", async function (request, reply) {
      let dbData;
      let connection;
      let data = request.body;

      // reply.send({
      //    data,
      //    msg: ">>>>>",
      // });
      // return;

      const sql =
         // "UPDATE ppm SET jenis_proposal = ?, jenis_kegiatan = ?, jenis_skema = ?, kelompok_keahlian = ?, topik = ?, tahun_pelaksanaan = ?, biaya_penelitian = ?, anggota_tim = ?, rab = ?, judul = ?, abstrak = ?, isi = ?,  comment = ?, status = ?, uid_kdept = ?, uid_klppm = ?, uid_kpk = ?, uid_reviewer = ? WHERE id = ?";

         "UPDATE ppm SET jenis_proposal = ?, jenis_kegiatan = ?, jenis_skema = ?, kelompok_keahlian = ?, topik = ?, tahun_pelaksanaan = ?, biaya_penelitian = ?, judul = ?, abstrak = ?, isi = ?,  comment = ?, status = ?, uid_kdept = ?, uid_klppm = ?, uid_kpk = ?, uid_reviewer = ? WHERE id = ?";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [
            data.jenisProposal,
            data.jenisKegiatan,
            data.jenisSkema,
            data.kelompokKeahlian,
            data.topik,
            data.tahunPelaksanaan,
            data.biayaPenelitian,
            // data.anggotaTim,
            // data.rab,
            data.judul,
            data.abstrak,
            data.isi,
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
