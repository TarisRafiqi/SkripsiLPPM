"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
   fastify.register(require("@fastify/mysql"), {
      connectionString: "mysql://root:saya2000@localhost/mydb",
      promise: true,
   });
});
