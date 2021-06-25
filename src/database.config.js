const mongoose = require("mongoose");

const MONGODB_URL = "mongodb+srv://user:user@cluster0.m66zr.mongodb.net/mercadopago?retryWrites=true;"
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((error) => {
    console.log("No se ha podido establecer la coneccion a la base de datos ", error);
  });