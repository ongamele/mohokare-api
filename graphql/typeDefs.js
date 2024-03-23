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

  type Email {
    id: ID!
    accountNumber: String
    status: String
    createdAt: String!
  }
  type Sms {
    id: ID!
    accountNumber: String
    status: String
    createdAt: String!
  }

  type Notification {
    emails: [Email]
    sms: [Sms]
  }

  type StatementDetail {
    id: ID!
    firstName: String
    lastName: String
    date: String
    accountNumber: String!
    consumerName: String
    phoneNumber: String
    email: String
    password: String
    idNumber: String
    isIndigent: String
    indigentExpiry: String
    indigentApplicationDate: String
    lastPaymentDate: String
    lastPaymentAmount: String
    accountStatus: String
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
    closingBalance: String
    erfNumber: String
    taxNumber: String
    days120: Float
    days90: Float
    days60: Float
    days30: Float
    current: Float

    openingBalance: String
    token: String!
    createdAt: String
  }

  input StatementDetailsInput {
    date: String
    accountNumber: String!
    consumerName: String
    phoneNumber: String
    email: String
    idNumber: String
    isIndigent: String
    indigentExpiry: String
    indigentApplicationDate: String
    lastPaymentDate: String
    lastPaymentAmount: String
    accountStatus: String
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
    days120: Float
    days90: Float
    days60: Float
    days30: Float
    current: Float
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

  type PaymentArrangement {
    id: ID!
    accountNumber: String!
    paymentDate: String!
    amount: Int!
    createdAt: String!
  }

  input AdminInput {
    name: String!
    surname: String!
    email: String!
    phoneNumber: String!
    password: String!
  }

  type PaymentReminders {
    id: ID!
    notificationType: String!
    age: String!
    message: String!
    status: String!
    createdAt: String!
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
    getSuccessfulEmailsCount: Int!
    getFailedEmailsCount: Int
    getSuccessfulSmsCount: Int!
    getFailedSmsCount: Int
    getUserNotifications(accountNumber: String!): Notification
    getAllNotifications: Notification

    getAllPaymentArrangements: [PaymentArrangement]
    getUserPaymentArrangements(accountNumber: String!): [PaymentArrangement]

    getSuccessfulPaymentRemindersCount: Int!
    getFailedPaymentRemindersCount: Int!
    getCustomers: String!
  }

  type Mutation {
    loginAdmin(email: String!, password: String!): Admin!
    loginCustomer(email: String!, password: String!): StatementDetail!
    createNotifications: String!
    createUserNotification(accountNumber: String!): String!
    createUserSmsNotification(accountNumber: String!): String!
    createUserEmailNotification(accountNumber: String!): String!
    createAdmin(adminInput: AdminInput): Admin!
    createStatementDetails(input: StatementDetailsInput): String!
    createMeterReadings(meterReadingsInput: MeterReadingsInput): String
    createOpeningStatement(input: BalanceInput): String!
    createCashPayment(input: BalanceInput): String!
    createRefuse(input: BalanceInput): String!
    createSewerage(input: BalanceInput): String!
    createWaterTariffDomestic(input: BalanceInput): String!
    createCharge(input: BalanceInput): String!
    createVat(input: BalanceInput): String!
    createInterest(input: BalanceInput): String!
    addBalanceReport(input: BalanceReportInput): String!
    updateUserDetails(
      accountNumber: String
      firstName: String
      lastName: String
      phoneNumber: String
      email: String
    ): String!

    createPaymentArrangement(
      accountNumber: String!
      paymentDate: String!
      amount: Int!
    ): String!

    createPaymentReminders(
      notificationType: String
      age: String
      message: String
    ): String!

    processPayment(
      amount: Float!
      name: String!
      expiryMonth: String!
      expiryYear: Int!
      cvc: Int!
      name: String!
      accountNumber: String!
      cardNumber: String!
    ): String!
  }
`;
