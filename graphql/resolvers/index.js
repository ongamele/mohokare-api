const adminResolvers = require("./admin");
const customerResolvers = require("./customer");
const statementsResolvers = require("./statements");
const openingStatementsResolvers = require("./openingStatement");
const meterReadingsResolvers = require("./meterReadings");
const cardPaymentResolvers = require("./cardPayment");

module.exports = {
  Query: {
    ...statementsResolvers.Query,
    ...meterReadingsResolvers.Query,
    ...adminResolvers.Query,
    ...openingStatementsResolvers.Query,
    ...cardPaymentResolvers.Query,
  },
  Mutation: {
    ...statementsResolvers.Mutation,
    ...meterReadingsResolvers.Mutation,
    ...adminResolvers.Mutation,
    ...openingStatementsResolvers.Mutation,
    ...customerResolvers.Mutation,
    ...cardPaymentResolvers.Mutation,
  },
};
