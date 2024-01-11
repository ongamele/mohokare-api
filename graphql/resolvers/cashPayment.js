const CashPayment = require("../../models/CashPayment");

module.exports = {
  Query: {},

  Mutation: {
    createCashPayment: async (_, { input }) => {
      try {
        const { accountNumber, date, code, description, units, tariff, value } =
          input;

        const res = new OpeningStatement({
          accountNumber: accountNumber,
          date: date,
          code: code,
          description: description,
          units: units,
          tariff: tariff,
          value: value,
          createdAt: new Date().toISOString(),
        });

        await res.save();

        // Save the new statement to the database or perform necessary operations

        // Assuming the statement is saved successfully, return a success message
        return { message: "Opening Statement created successfully" };
      } catch (error) {
        console.error("Error creating statement:", error);
        // Handle errors and throw an appropriate error
        throw new Error("Failed to create statement");
      }
    },
  },
};
