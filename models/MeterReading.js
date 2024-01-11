const { model, Schema } = require("mongoose");

const meterReadingsSchema = new Schema({
  accountNumber: String,
  meterNumber: String,
  type: String,
  oldRead: String,
  newRead: String,
  consumption: String,
  leviedAmount: String,
  createdAt: String,
});

module.exports = model("MeterReading", meterReadingsSchema);
