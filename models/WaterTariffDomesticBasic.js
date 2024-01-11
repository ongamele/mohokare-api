const { model, Schema } = require("mongoose");

const waterTariffDomesticBasicSchema = new Schema({
  accountNumber: String,
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

module.exports = model(
  "WaterTariffDomesticBasicBalance",
  waterTariffDomesticBasicSchema
);
