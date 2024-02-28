const axios = require("axios");
const bcrypt = require("bcryptjs");
const Statement = require("../../models/Statement");
const MeterReading = require("../../models/MeterReading");
const StatementDetail = require("../../models/StatementDetail");
const CashPayment = require("../../models/CashPayment");
const Interest = require("../../models/Interest");
const Refuse = require("../../models/Refuse");
const Sewerage = require("../../models/Sewerage");
const Vat = require("../../models/Vat");
const Sms = require("../../models/Sms");
const Email = require("../../models/Email");
const WaterTariffDomestic = require("../../models/WaterTariffDomestic");
const PaymentArrangement = require("../../models/PaymentArrangement");
const PaymentReminder = require("../../models/PaymentReminder");
const sendMail = require("../../util/sendMail");

const sendSMS = async (phoneNumber, customMessage = null) => {
  let formattedPhoneNumber = phoneNumber.substring(1);

  try {
    const apiKey =
      "2319f2b218dfee20edf691f73ccba12f-73d582c6-316c-4b53-a90c-1c0c1fa1c94f";

    // Use custom message if provided, otherwise use the default message
    const message =
      customMessage ||
      `Mohokare: Hello, Your statement for the month of December is available. You can access it here https://mohokarestatements.co.za/`;

    const response = await axios.post(
      "https://api.infobip.com/sms/1/text/single",
      {
        from: "27872406515",
        to: "27" + formattedPhoneNumber,
        text: message,
      },
      {
        headers: {
          Authorization: `App ${apiKey}`,
        },
      }
    );

    console.log("SMS STATUS ----------------> ", response.status);

    return "Statements uploaded successfully!";
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

module.exports = {
  Query: {
    async getAllStatements() {
      try {
        const statementDetailsData = await StatementDetail.find();

        return statementDetailsData;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getAllPaymentArrangements() {
      try {
        const paymentArrangements = await PaymentArrangement.find();

        return paymentArrangements;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getStatement(_, { accountNumber }) {
      try {
        const statement = await StatementDetail.findOne({
          accountNumber: accountNumber,
        });
        return statement;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getCashPayment(_, { accountNumber }) {
      try {
        const statement = await CashPayment.findOne({
          accountNumber: accountNumber,
        });
        return statement;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getInterest(_, { accountNumber }) {
      try {
        const statement = await Interest.findOne({
          accountNumber: accountNumber,
        });
        return statement;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getRefuse(_, { accountNumber }) {
      try {
        const statement = await Refuse.findOne({
          accountNumber: accountNumber,
        });
        return statement;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getSewerage(_, { accountNumber }) {
      try {
        const statement = await Sewerage.findOne({
          accountNumber: accountNumber,
        });
        return statement;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getVat(_, { accountNumber }) {
      try {
        const statement = await Vat.findOne({
          accountNumber: accountNumber,
        });
        return statement;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getWaterTariffDomestic(_, { accountNumber }) {
      try {
        const statement = await WaterTariffDomestic.findOne({
          accountNumber: accountNumber,
        });
        return statement;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getWaterTariffDomesticBasic(_, { accountNumber }) {
      try {
        const statement = await WaterTariffDomestic.findOne({
          accountNumber: accountNumber,
        });
        return statement;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getSuccessfulEmailsCount() {
      try {
        const successfulEmailCount = await Email.countDocuments({
          status: "Successful",
        });
        return successfulEmailCount;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getFailedEmailsCount() {
      try {
        const successfulEmailCount = await Email.countDocuments({
          status: "Failed",
        });
        return successfulEmailCount;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getSuccessfulSmsCount() {
      try {
        const successfulSmsCount = await Sms.countDocuments({
          status: "Successful",
        });
        return successfulSmsCount;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getFailedSmsCount() {
      try {
        const failedSmsCount = await Sms.countDocuments({
          status: "Failed",
        });
        return failedSmsCount;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getUserNotifications(_, { accountNumber }) {
      try {
        const [emails, sms] = await Promise.all([
          Email.find({ accountNumber }),
          Sms.find({ accountNumber }),
        ]);

        // Create an object with the results
        const notifications = {
          emails,
          sms,
        };

        return notifications;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getAllNotifications() {
      try {
        const sms = await Sms.find();

        const emails = await Email.find();
        // Create an object with the results
        const notifications = {
          emails,
          sms,
        };

        return notifications;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getUserPaymentArrangements(_, { accountNumber }) {
      try {
        const userPaymentArrangements = await PaymentArrangement.find({
          accountNumber,
        });
        return userPaymentArrangements;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getSuccessfulPaymentRemindersCount() {
      try {
        const successCount = await PaymentReminder.countDocuments({
          status: "Successful",
        });
        return successCount;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },

    async getFailedPaymentRemindersCount() {
      try {
        const failedCount = await PaymentReminder.countDocuments({
          status: "Failed",
        });
        return failedCount;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },

  Mutation: {
    createStatementDetails: async (_, { input }) => {
      try {
        const {
          accountNumber,
          consumerName,
          date,
          phoneNumber,
          email,
          idNumber,
          isIndigent,
          indigentExpiry,
          indigentApplicationDate,
          lastPaymentDate,
          lastPaymentAmount,
          accountStatus,
          province,
          town,
          ward,
          street,
          postalAddress1,
          postalAddress2,
          postalAddress3,
          postalCode,
          vatNumber,
          marketValue,
          erfNumber,
          deposit,
          taxNumber,
          days120,
          days90,
          days60,
          days30,
          current,
          closingBalance,
          openingBalance,
        } = input;

        // Check if a record with the given accountNumber already exists
        const existingRecord = await StatementDetail.findOne({ accountNumber });

        if (existingRecord) {
          // If record exists, update the existing record
          await StatementDetail.updateOne(
            { accountNumber },
            {
              $set: {
                consumerName,
                date,
                phoneNumber,
                email,
                idNumber,
                isIndigent,
                indigentExpiry,
                indigentApplicationDate,
                lastPaymentDate,
                lastPaymentAmount,
                accountStatus,
                province,
                town,
                ward,
                street,
                postalAddress1,
                postalAddress2,
                postalAddress3,
                postalCode,
                vatNumber,
                marketValue,
                erfNumber,
                deposit,
                taxNumber,
                days120,
                days90,
                days60,
                days30,
                current,
                closingBalance,
                openingBalance,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          return { message: "Details updated successfully" };
        } else {
          // If record doesn't exist, create a new one
          const newRecord = new StatementDetail({
            accountNumber,
            firstName: "",
            lastName: "",
            consumerName,
            date,
            phoneNumber,
            email,
            password: "",
            idNumber,
            isIndigent,
            indigentExpiry,
            indigentApplicationDate,
            lastPaymentDate,
            lastPaymentAmount,
            accountStatus,
            province,
            town,
            ward,
            street,
            postalAddress1,
            postalAddress2,
            postalAddress3,
            postalCode,
            vatNumber,
            marketValue,
            erfNumber,
            deposit,
            taxNumber,
            days120,
            days90,
            days60,
            days30,
            current,
            closingBalance,
            openingBalance,
            createdAt: new Date().toISOString(),
          });

          await newRecord.save();

          return { message: "Details added successfully" };
        }
      } catch (error) {
        console.error("Error creating/updating statement: ", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update statement----- ", error);
      }
    },

    addBalanceReport: async (_, { input }) => {
      try {
        const {
          accountNumber,
          marketValue,
          erfNumber,
          vatNumber,
          closingBalance,
        } = input;

        // Check if a record with the given accountNumber already exists
        const existing = await StatementDetail.findOne({
          accountNumber,
        });

        if (existing) {
          // If record exists, update the existing record
          await StatementDetail.updateOne(
            { accountNumber },
            {
              $set: {
                marketValue,
                erfNumber,
                vatNumber,
                closingBalance,
              },
            }
          );

          return { message: "Balance Report updated successfully" };
        } else {
          return { message: "Balance Report doesn't exist" };
        }
      } catch (error) {
        console.error("Error creating/updating balance report:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update balance report");
      }
    },

    createCashPayment: async (_, { input }) => {
      try {
        const { accountNumber, date, code, description, units, tariff, value } =
          input;

        // Check if a record with the given accountNumber, date, and code already exists
        const existingPayment = await CashPayment.findOne({
          accountNumber,
        });

        if (existingPayment) {
          // If record exists, update the existing record
          await CashPayment.updateOne(
            { accountNumber },
            {
              $set: {
                description,
                units,
                tariff,
                value,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          return { message: "Cash payment updated successfully" };
        } else {
          // If record doesn't exist, create a new one
          const newPayment = new CashPayment({
            accountNumber,
            date,
            code,
            description,
            units,
            tariff,
            value,
            createdAt: new Date().toISOString(),
          });

          await newPayment.save();
          return { message: "Cash payment created successfully" };
        }
      } catch (error) {
        console.error("Error creating/updating cash payment:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update cash payment");
      }
    },

    createInterest: async (_, { input }) => {
      try {
        const { accountNumber, date, code, description, units, tariff, value } =
          input;

        // Check if a record with the given accountNumber, date, and code already exists
        const existingInterest = await Interest.findOne({
          accountNumber,
        });

        if (existingInterest) {
          // If record exists, update the existing record
          await Interest.updateOne(
            { accountNumber },
            {
              $set: {
                description,
                units,
                tariff,
                value,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          return { message: "Interest updated successfully" };
        } else {
          // If record doesn't exist, create a new one
          const newInterest = new Interest({
            accountNumber,
            date,
            code,
            description,
            units,
            tariff,
            value,
            createdAt: new Date().toISOString(),
          });

          await newInterest.save();
          return { message: "Interest created successfully" };
        }
      } catch (error) {
        console.error("Error creating/updating interest:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update interest");
      }
    },

    createRefuse: async (_, { input }) => {
      try {
        const { accountNumber, date, code, description, units, tariff, value } =
          input;

        // Check if a record with the given accountNumber, date, and code already exists
        const existingRefuse = await Refuse.findOne({
          accountNumber,
        });

        if (existingRefuse) {
          // If record exists, update the existing record
          await Refuse.updateOne(
            { accountNumber },
            {
              $set: {
                description,
                units,
                tariff,
                value,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          return { message: "Refuse updated successfully" };
        } else {
          // If record doesn't exist, create a new one
          const newRefuse = new Refuse({
            accountNumber,
            date,
            code,
            description,
            units,
            tariff,
            value,
            createdAt: new Date().toISOString(),
          });

          await newRefuse.save();
          return { message: "Refuse created successfully" };
        }
      } catch (error) {
        console.error("Error creating/updating refuse:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update refuse");
      }
    },

    createSewerage: async (_, { input }) => {
      try {
        const { accountNumber, date, code, description, units, tariff, value } =
          input;

        // Check if a record with the given accountNumber, date, and code already exists
        const existingSewerage = await Sewerage.findOne({
          accountNumber,
        });

        if (existingSewerage) {
          // If record exists, update the existing record
          await Sewerage.updateOne(
            { accountNumber },
            {
              $set: {
                description,
                units,
                tariff,
                value,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          return { message: "Sewerage updated successfully" };
        } else {
          // If record doesn't exist, create a new one
          const newSewerage = new Sewerage({
            accountNumber,
            date,
            code,
            description,
            units,
            tariff,
            value,
            createdAt: new Date().toISOString(),
          });

          await newSewerage.save();
          return { message: "Sewerage created successfully" };
        }
      } catch (error) {
        console.error("Error creating/updating sewerage:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update sewerage");
      }
    },

    createVat: async (_, { input }) => {
      try {
        const { accountNumber, date, code, description, units, tariff, value } =
          input;

        // Check if a record with the given accountNumber, date, and code already exists
        const existingVat = await Vat.findOne({
          accountNumber,
        });

        if (existingVat) {
          // If record exists, update the existing record
          await Vat.updateOne(
            { accountNumber },
            {
              $set: {
                description,
                units,
                tariff,
                value,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          return { message: "Vat updated successfully" };
        } else {
          // If record doesn't exist, create a new one
          const newVat = new Vat({
            accountNumber,
            date,
            code,
            description,
            units,
            tariff,
            value,
            createdAt: new Date().toISOString(),
          });

          await newVat.save();
          return { message: "Vat created successfully" };
        }
      } catch (error) {
        console.error("Error creating/updating vat:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update vat");
      }
    },

    createWaterTariffDomestic: async (_, { input }) => {
      try {
        const { accountNumber, date, code, description, units, tariff, value } =
          input;

        // Check if a record with the given accountNumber, date, and code already exists
        const existingWaterTariffDomestic = await WaterTariffDomestic.findOne({
          accountNumber,
        });

        if (existingWaterTariffDomestic) {
          // If record exists, update the existing record
          await WaterTariffDomestic.updateOne(
            { accountNumber },
            {
              $set: {
                description,
                units,
                tariff,
                value,
                updatedAt: new Date().toISOString(),
              },
            }
          );

          return { message: "Water Tariff Domestic updated successfully" };
        } else {
          // If record doesn't exist, create a new one
          const newWaterTariffDomestic = new WaterTariffDomestic({
            accountNumber,
            date,
            code,
            description,
            units,
            tariff,
            value,
            createdAt: new Date().toISOString(),
          });

          await newWaterTariffDomestic.save();
          return { message: "Water Tariff Domestic created successfully" };
        }
      } catch (error) {
        console.error("Error creating/updating water tariff domestic:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update water tariff domestic");
      }
    },

    async createUserNotification(_, { accountNumber }) {
      try {
        let emailMessage =
          "Mohokare: Hello, Your statement for the month of December is available. You can access it here https://mohokarestatements.co.za/";
        const statement = await StatementDetail.findOne({
          accountNumber,
        });

        // console.log(statement.email);

        if (statement.email) {
          await sendMail(statement.email, "Mohokare Statement", emailMessage);
          let successfulEmailRes = new Email({
            accountNumber: statement.accountNumber,
            status: "Successful",
            createdAt: new Date().toISOString(),
          });
          successfulEmailRes.save();
        }

        if (!statement.email) {
          let failedEmailRes = new Email({
            accountNumber: statement.accountNumber,
            status: "Failed",
            createdAt: new Date().toISOString(),
          });

          failedEmailRes.save();
        }

        if (statement.phoneNumber) {
          // sendSMS(statements[i].phoneNumber);
          let successfulSmsRes = new Sms({
            accountNumber: statement.accountNumber,
            status: "Successful",
            createdAt: new Date().toISOString(),
          });

          successfulSmsRes.save();
        }
        if (!statement.phoneNumber) {
          let failedSmsRes = new Sms({
            accountNumber: statement.accountNumber,
            status: "Failed",
            createdAt: new Date().toISOString(),
          });

          failedSmsRes.save();
        }
        return "User Notifications sent";
      } catch (error) {
        /*new Email({
          accountNumber: statements.AccountNumber,
          status: 'Failed',
          createdAt: new Date().toISOString(),
        });*/
        console.error("Error in createNotifications:", error);
        throw error; // Propagate the error if needed
      }
    },

    async createUserSmsNotification(_, { accountNumber }) {
      const statement = await StatementDetail.findOne({
        accountNumber,
      });
      try {
        let smsNote =
          "Mohokare. Please download your statement here http://localhost:5173/download/0000000001";
        sendSMS(statement.phoneNumber, smsNote);
        if (statement.phoneNumber) {
          let successfulSmsRes = new Sms({
            accountNumber: statement.accountNumber,
            status: "Successful",
            createdAt: new Date().toISOString(),
          });

          successfulSmsRes.save();
        }
        if (!statement.phoneNumber) {
          let failedSmsRes = new Sms({
            accountNumber: statement.accountNumber,
            status: "Failed",
            createdAt: new Date().toISOString(),
          });

          failedSmsRes.save();
        }
        return "User Notifications sent";
      } catch (error) {
        /*new Email({
          accountNumber: statements.AccountNumber,
          status: 'Failed',
          createdAt: new Date().toISOString(),
        });*/
        console.error("Error in createNotifications:", error);
        throw error; // Propagate the error if needed
      }
    },

    async createUserEmailNotification(_, { accountNumber }) {
      try {
        let emailMessage =
          "Mohokare: Hello, Your statement for the month of December is available. You can access it here https://mohokarestatements.co.za/";
        const statement = await StatementDetail.findOne({
          accountNumber,
        });

        // console.log(statement.email);

        if (statement.email) {
          await sendMail(statement.email, "Mohokare Statement", emailMessage);
          let successfulEmailRes = new Email({
            accountNumber: statement.accountNumber,
            status: "Successful",
            createdAt: new Date().toISOString(),
          });
          successfulEmailRes.save();
        }

        if (!statement.email) {
          let failedEmailRes = new Email({
            accountNumber: statement.accountNumber,
            status: "Failed",
            createdAt: new Date().toISOString(),
          });

          failedEmailRes.save();
        }

        return "Email Notifications sent successfully";
      } catch (error) {
        new Email({
          accountNumber: statements.AccountNumber,
          status: "Failed",
          createdAt: new Date().toISOString(),
        });
        console.error("Error in createNotifications:", error);
        throw error; // Propagate the error if needed
      }
    },
    async createNotifications() {
      try {
        let emailMessage =
          "Mohokare: Hello, Your statement for the month of December is available. You can access it here https://mohokarestatements.co.za/";
        const statements = await StatementDetail.find();

        for (let i = 0; i < statements.length; i++) {
          if (statements[i].email) {
            await sendMail(
              statements[i].email,
              "Mohokare Statement",
              emailMessage
            );
            let successfulEmailRes = new Email({
              accountNumber: statements[i].accountNumber,
              status: "Successful",
              createdAt: new Date().toISOString(),
            });
            successfulEmailRes.save();
          }

          if (!statements[i].email) {
            let failedEmailRes = new Email({
              accountNumber: statements[i].accountNumber,
              status: "Failed",
              createdAt: new Date().toISOString(),
            });

            failedEmailRes.save();
          }

          if (statements[i].phoneNumber) {
            sendSMS(statements[i].phoneNumber);
            let successfulSmsRes = new Sms({
              accountNumber: statements[i].accountNumber,
              status: "Successful",
              createdAt: new Date().toISOString(),
            });

            successfulSmsRes.save();
          }
          if (!statements[i].phoneNumber) {
            let failedSmsRes = new Sms({
              accountNumber: statements[i].accountNumber,
              status: "Failed",
              createdAt: new Date().toISOString(),
            });

            failedSmsRes.save();
          }
        }
        return "Bulk Notifications sent";
      } catch (error) {
        new Email({
          accountNumber: statements.AccountNumber,
          status: "Failed",
          createdAt: new Date().toISOString(),
        });
        console.error("Error in createNotifications:", error);
        throw error; // Propagate the error if needed
      }
    },

    async updateUserDetails(
      _,
      { accountNumber, firstName, lastName, phoneNumber, email }
    ) {
      // Hash the password

      function generateRandomString() {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        return result;
      }

      // Generate a random string
      const randomString = generateRandomString();
      var newPassword = await bcrypt.hash(randomString, 12);

      try {
        // Find the user by account number
        const existingUser = await StatementDetail.findOne({ accountNumber });

        if (!existingUser) {
          throw new Error("User not found");
        }

        // Update the user details
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.phoneNumber = phoneNumber;
        existingUser.email = email;
        existingUser.password = newPassword;

        // Save the updated user details
        await existingUser.save();

        let newMessage = `Your Mohokare username is ${email} and your password is ${randomString}`;

        sendSMS(phoneNumber, newMessage);

        return "Details updated successfully";
      } catch (error) {
        // Handle errors, e.g., user not found or database error
        console.error("Error updating user details:", error);
        throw new Error("Error updating user details");
      }
    },

    createPaymentArrangement: async (
      _,
      { accountNumber, paymentDate, amount }
    ) => {
      const startOfMonth = new Date();
      startOfMonth.setDate(2); // Set to the first day of the month
      startOfMonth.setHours(0, 0, 0, 0); // Set to the beginning of the day

      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(0); // Set to the last day of the month
      endOfMonth.setHours(23, 59, 59, 999); // Set to the end of the day

      try {
        const record = await PaymentArrangement.find({
          accountNumber,
          createdAt: {
            $gte: startOfMonth.toISOString(),
            $lte: endOfMonth.toISOString(),
          },
        });

        // If record doesn't exist, create a new one
        if (record.length === 0) {
          const newPaymentArrangement = new PaymentArrangement({
            accountNumber,
            paymentDate,
            amount,
            createdAt: new Date().toISOString(),
          });
          await newPaymentArrangement.save();
          return "Payment arrangement created successfully.";
        } else {
          return "You've already made payment arrangement this month.";
        }
      } catch (error) {
        console.error("Error creating payment arrangement:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Error creating payment arrangement");
      }
    },

    createPaymentReminders: async (_, { notificationType, age, message }) => {
      try {
        var users = {};

        if (age === "days30") {
          users = await StatementDetail.find({ days30: { $ne: "" } });
        }

        if (age === "days60") {
          users = await StatementDetail.find({ days60: { $ne: "" } });
        }

        if (age === "days90") {
          users = await StatementDetail.find({ days60: { $ne: "" } });
        }

        if (age === "days120") {
          users = await StatementDetail.find({ days60: { $ne: "" } });
        }

        for (let i = 0; i < users.length; i++) {
          if (notificationType === "SMS") {
            if (users[i].phoneNumber) {
              await sendSMS(users[i].phoneNumber, message);
              var newPaymentAReminder = new PaymentReminder({
                notificationType,
                age,
                message,
                status: "Successful",
                accountNumber: users[i].accountNumber,
                createdAt: new Date().toISOString(),
              });

              await newPaymentAReminder.save();
            } else {
              var newPaymentAReminder = new PaymentReminder({
                notificationType,
                age,
                message,
                status: "Failed",
                accountNumber: users[i].accountNumber,
                createdAt: new Date().toISOString(),
              });

              await newPaymentAReminder.save();
            }
          } else if (notificationType === "Email") {
            if (users[i].email) {
              await sendMail(
                users[i].email,
                "Mohokare Payment Reminder",
                message
              );
              var newPaymentAReminder = new PaymentReminder({
                notificationType,
                age,
                message,
                status: "Seccessful",
                accountNumber: users[i].accountNumber,
                createdAt: new Date().toISOString(),
              });

              await newPaymentAReminder.save();
            } else {
              var newPaymentAReminder = new PaymentReminder({
                notificationType,
                age,
                message,
                status: "Failed",
                accountNumber: users[i].accountNumber,
                createdAt: new Date().toISOString(),
              });

              await newPaymentAReminder.save();
            }
          }
        }

        return "Payment reminder sent successfully";
      } catch (error) {
        console.error("Error creating payment reminder:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Error creating payment arrangement");
      }
    },
  },
};
