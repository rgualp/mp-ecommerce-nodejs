const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = {
  response: { type: String, required: true },
  type: { type: String, required: true },
};
const ResponseModelSchema = new Schema(schema);
const ResponseModel = mongoose.model("ResponseModel", ResponseModelSchema);
module.exports = ResponseModel;
