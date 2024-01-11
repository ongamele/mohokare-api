const { model, Schema } = require("mongoose");

// Define the OpeningBalance schema
const openingBalanceSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

// Define the CashPayment schema
const cashPaymentSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

// Define the Refuse schema
const refuseSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

const sewerageSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

const waterTariffDomesticSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

const waterTariffDomesticBasicSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

const chargeSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

const vatSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

const interestSchema = new Schema({
  date: String,
  code: String,
  description: String,
  units: String,
  tariff: String,
  value: String,
  createdAt: String,
});

// Define the Statements schema
const statementsSchema = new Schema({
  accountNumber: String,
  date: String,
  openingBalances: [openingBalanceSchema],
  cashPayments: [cashPaymentSchema],
  refuse: [refuseSchema],
  sewerage: [sewerageSchema],
  waterTariffDomestic: [waterTariffDomesticSchema],
  waterTariffDomesticBasics: [waterTariffDomesticBasicSchema],
  charges: [chargeSchema],
  vat: [vatSchema],
  interests: [interestSchema],
  createdAt: String,
});

// Create the model for Statements
module.exports = model("Statement", statementsSchema);
