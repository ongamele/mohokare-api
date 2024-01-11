const { gql } = require("apollo-server-express");

module.exports = gql`
  type MeterReadings {
    id: ID!
    accountNumber: String
    meterNumber: String
    type: String
    oldRead: String
    newRead: String
    consumption: String
    leviedAmount: String
    createdAt: String!
  }

  input MeterReadingsInput {
    accountNumber: String
    meterNumber: String
    type: String
    oldRead: String
    newRead: String
    consumption: String
    leviedAmount: String
  }

  input BalanceReportInput {
    accountNumber: String
    email: String
    phoneNumber: String
    marketValue: String
    erfNumber: String
    vatNumber: String
    closingBalance: String
  }

  type Balance {
    id: ID!
    accountNumber: String
    date: String
    code: String
    description: String
    units: String
    tariff: String
    value: String
    createdAt: String!
  }

  input BalanceInput {
    accountNumber: String
    date: String
    code: String
    description: String
    units: String
    tariff: String
    value: String
  }

  type StatementDetail {
    id: ID!
    date: String
    accountNumber: String!
    consumerName: String
    phoneNumber: String
    email: String
    province: String
    town: String
    suburb: String
    ward: String
    street: String
    postalAddress1: String
    postalAddress2: String
    postalAddress3: String
    postalCode: String
    vatNumber: String
    deposit: String
    marketValue: String
    erfNumber: String
    taxNumber: String
    days120: String
    days90: String
    days60: String
    days30: String
    current: String
    closingBalance: String
    openingBalance: String
    createdAt: String
  }

  input StatementDetailsInput {
    date: String
    accountNumber: String!
    consumerName: String
    phoneNumber: String
    email: String
    province: String
    town: String
    suburb: String
    ward: String
    street: String
    postalAddress1: String
    postalAddress2: String
    postalAddress3: String
    postalCode: String
    vatNumber: String
    deposit: String
    marketValue: String
    erfNumber: String
    taxNumber: String
    days120: String
    days90: String
    days60: String
    days30: String
    current: String
    closingBalance: String
    openingBalance: String
  }

  type Admin {
    id: ID!
    name: String!
    surname: String!
    email: String!
    phoneNumber: String!
    password: String!
    token: String!
    createdAt: String!
  }

  input AdminInput {
    name: String!
    surname: String!
    email: String!
    phoneNumber: String!
    password: String!
  }

  type Query {
    getAllStatements: [StatementDetail]
    getStatement(accountNumber: String!): StatementDetail
    getCashPayment(accountNumber: String!): Balance
    getInterest(accountNumber: String!): Balance
    getRefuse(accountNumber: String!): Balance
    getSewerage(accountNumber: String!): Balance
    getVat(accountNumber: String!): Balance
    getWaterTariffDomestic(accountNumber: String!): Balance
    getWaterTariffDomesticBasic(accountNumber: String!): Balance
    getAllMeterReadings: [MeterReadings]
    getMeterReadings(accountNumber: String!): MeterReadings
    getAdmins: [Admin]
  }

  type Mutation {
    loginAdmin(email: String!, password: String!): Admin!
    createAdmin(adminInput: AdminInput): Admin!
    createStatementDetails(input: StatementDetailsInput): String!
    createMeterReadings(meterReadingsInput: MeterReadingsInput): String
    createOpeningStatement(input: BalanceInput): String!
    createCashPayment(input: BalanceInput): String!
    createRefuse(input: BalanceInput): String!
    createSewerage(input: BalanceInput): String!
    createWaterTariffDomestic(input: BalanceInput): String!
    createWaterTariffDomesticBasic(input: BalanceInput): String!
    createCharge(input: BalanceInput): String!
    createVat(input: BalanceInput): String!
    createInterest(input: BalanceInput): String!
    addBalanceReport(input: BalanceReportInput): String!
  }
`;
