"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
   fastify.register(require("@fastify/mysql"), {
      connectionString: "mysql://root:root@localhost/mydb",
      promise: true,
   });
});
