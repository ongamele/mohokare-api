const { model, Schema } = require("mongoose");

const sewerageSchema = new Schema({
  accountNumber: String,
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

module.exports = model("SewerageBalance", sewerageSchema);
