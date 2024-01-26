const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../../models/Admin");
const StatementDetail = require("../../models/StatementDetail");
const { SECRETE_KEY } = require("../../config");

function generateToken(user) {
  return jwt.sign(
    {
      name: user.firstName,
      surname: user.lastName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    },
    SECRETE_KEY,
    { expiresIn: "2h" }
  );
}

module.exports = {
  Query: {
    async getCustomers() {
      try {
        const StatementDetail = await StatementDetail.find().sort({
          createdAt: -1,
        });
        return StatementDetail;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async loginCustomer(_, { email, password }) {
      const user = await StatementDetail.findOne({ email });

      if (!user) {
        const errors = "User not found";

        return errors;
      }

      const match = await bcrypt.compare(password, user.password);
      console.log(match);

      if (!match) {
        const wrongError = "Wrong credentials";

        return wrongError;
      }
      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    },
  },
};
