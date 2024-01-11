const { model, Schema } = require("mongoose");

const statementDetailSchema = new Schema({
  accountNumber: String,
  date: String,
  consumerName: String,
  phoneNumber: String,
  email: String,
  province: String,
  town: String,
  suburb: String,
  ward: String,
  street: String,
  postalAddress1: String,
  postalAddress2: String,
  postalAddress3: String,
  postalCode: String,
  vatNumber: String,
  deposit: String,
  marketValue: String,
  erfNumber: String,
  taxNumber: String,
  days120: String,
  days90: String,
  days60: String,
  current: String,
  closingBalance: String,
  openingBalance: String,
  createdAt: String,
});

module.exports = model("StatementDetail", statementDetailSchema);
