const Statement = require("../../models/Statement");
const MeterReading = require("../../models/MeterReading");
const StatementDetail = require("../../models/StatementDetail");
const CashPayment = require("../../models/CashPayment");
const Interest = require("../../models/Interest");
const Refuse = require("../../models/Refuse");
const Sewerage = require("../../models/Sewerage");
const Vat = require("../../models/Vat");
const WaterTariffDomestic = require("../../models/WaterTariffDomestic");
const WaterTariffDomesticBasic = require("../../models/WaterTariffDomesticBasic");
const sendMail = require("../../util/sendMail");

module.exports = {
  Query: {
    async getAllStatements() {
      try {
        const statementDetailsData = await StatementDetail.find();

        console.log(statementDetailsData);
        return statementDetailsData;
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
            consumerName,
            date,
            phoneNumber,
            email,
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
          email,
          phoneNumber,
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
                email,
                phoneNumber,
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

    createWaterTariffDomesticBasic: async (_, { input }) => {
      try {
        const { accountNumber, date, code, description, units, tariff, value } =
          input;

        // Check if a record with the given accountNumber, date, and code already exists
        const existingWaterTariffDomesticBasic =
          await WaterTariffDomesticBasic.findOne({
            accountNumber,
          });

        if (existingWaterTariffDomesticBasic) {
          // If record exists, update the existing record
          await WaterTariffDomesticBasic.updateOne(
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

          return {
            message: "Water Tariff Domestic Basic updated successfully",
          };
        } else {
          // If record doesn't exist, create a new one
          const newWaterTariffDomesticBasic = new WaterTariffDomesticBasic({
            accountNumber,
            date,
            code,
            description,
            units,
            tariff,
            value,
            createdAt: new Date().toISOString(),
          });

          await newWaterTariffDomesticBasic.save();
          return {
            message: "Water Tariff Domestic Basic created successfully",
          };
        }
      } catch (error) {
        console.error(
          "Error creating/updating water tariff domestic basic:",
          error
        );
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create/update water tariff domestic basic");
      }
    },
  },

  async createMeterReadings(
    _,
    {
      meterReadingsInput: {
        accountNumber,
        oldRead,
        newRead,
        consumption,
        leviedAmount,
      },
    }
  ) {
    /*console.log(
      accountNumber +
        "- " +
        oldRead +
        "- " +
        newRead +
        "- " +
        consumption +
        "- " +
        leviedAmount
    );*/
    const newMeterReadings = new MeterReading({
      accountNumber: accountNumber,
      oldRead: oldRead,
      newRead: newRead,
      consumption: consumption,
      leviedAmount: leviedAmount,
      createdAt: new Date().toISOString(),
    });

    const res = await newMeterReadings.save();
    /*sendMail(
      "rofhiwa@zimako.co.za",
      "Mohokare Statement",
      "Mohokare: Hello, Your statement for the month of December is available. You can access it here https://mohokarestatements.co.za/"
    );*/

    return res;
  },

  //Create Cash Payment
};
