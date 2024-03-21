const MeterReading = require("../../models/MeterReading");
const sendMail = require("../../util/sendMail");

module.exports = {
  Query: {
    async getAllMeterReadings() {
      try {
        const meterReadings = await MeterReading.find().sort({
          createdAt: -1,
        });
        return meterReadings;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },

    async getMeterReadings(_, { accountNumber }) {
      try {
        const meterReadings = await MeterReading.findOne({
          accountNumber: accountNumber,
        });
        return meterReadings;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createMeterReadings(
      _,
      {
        meterReadingsInput: {
          accountNumber,
          meterNumber,
          type,
          oldRead,
          newRead,
          consumption,
          leviedAmount,
        },
      }
    ) {
      try {
        const existingReading = await MeterReading.findOne({ accountNumber });

        if (existingReading) {
          // Update existing record
          existingReading.type = type;
          existingReading.meterNumber = meterNumber;
          existingReading.oldRead = oldRead;
          existingReading.newRead = newRead;
          existingReading.consumption = consumption;
          existingReading.leviedAmount = leviedAmount;
          existingReading.createdAt = new Date().toISOString();

          await existingReading.save();

          return `Meter readings for account number ${accountNumber} updated successfully.`;
        } else {
          // Insert new record
          const newMeterReadings = new MeterReading({
            accountNumber,
            meterNumber,
            type,
            oldRead,
            newRead,
            consumption,
            leviedAmount,
            createdAt: new Date().toISOString(),
          });

          await newMeterReadings.save();

          return `Meter readings for account number ${accountNumber} created successfully.`;

          // You can uncomment the code below if you want to send an email
          /*
          sendMail(
            "rofhiwa@zimako.co.za",
            "Mohokare Statement",
            "Mohokare: Hello, Your statement for the month of December is available. You can access it here https://mohokarestatements.co.za/"
          );
          */
        }
      } catch (error) {
        console.log("Error in createMeterReadings:", error);
        throw new Error("An error occurred while processing meter readings.");
      }
    },
  },
};
