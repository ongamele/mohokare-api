const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    async getCustomers() {},
  },

  Mutation: {
    async processPayment(
      _,
      { amount, name, expiryMonth, expiryYear, cvc, accountNumber, cardNumber }
    ) {
      const username = "YeboPayAPIUser";
      const password = "76291953Celo@@";
      const apiUrl = "https://payments.yebopay.co.za/api/v1/pay/direct";

      const postData = {
        amount: amount,
        merchant_reference: accountNumber,
        pan: cardNumber,
        expiry: expiryMonth + expiryYear,
        cvv: cvc,
        first_name: name,
        last_name: name,
        return_url: "https://mohokare-customer.netlify.app",
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(username + ":" + password).toString("base64"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const responseData = await response.json();
        const httpCode = response.status;

        if (httpCode === 200) {
          if (
            responseData.type === "result" &&
            responseData.transaction &&
            responseData.transaction.status === "complete"
          ) {
            // Payment successful, handle accordingly
            return { success: true, message: "Payment successful" };
          } else if (
            responseData.type === "3ds_redirect" &&
            responseData.redirect_url
          ) {
            // Payment requires 3D Secure, handle accordingly
            return { success: false, redirectUrl: responseData.redirect_url };
          } else {
            // Payment failed, handle accordingly
            return { success: false, error: "Payment failed" };
          }
        } else {
          // Error occurred in request
          return {
            success: false,
            error: "An error occurred during payment processing",
          };
        }
      } catch (error) {
        // Handle network errors
        return { success: false, error: error.message };
      }
    },
  },
};
