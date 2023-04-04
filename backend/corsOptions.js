const corsOptions = {
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: process.env.CORS_HOST,
};

module.exports = corsOptions;
