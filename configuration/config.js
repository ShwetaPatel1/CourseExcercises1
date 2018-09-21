const config = {
  app: {
    port: 3000
  },
  MySQL_db: {
    host: "localhost",
    port: "3306",
    user: "<USERNAME>",
    password: "<Password>",
    database: "skillLocateDatabase",
    connectTimeout: 30000,
    acquireTimeout: 20000

  },
  email: {
    user: "<host@gmail.com>",
    password: "<Password>",
    host: "smtp.gmail.com",
    ssl: true
  }

};

module.exports = config;
