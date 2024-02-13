const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../../models/Admin");
const { SECRETE_KEY } = require("../../config");

function generateToken(admin) {
  return jwt.sign(
    {
      name: admin.name,
      surname: admin.surname,
      email: admin.email,
      password: admin.password,
      phoneNumber: admin.phoneNumber,
    },
    SECRETE_KEY,
    { expiresIn: "2h" }
  );
}

module.exports = {
  Query: {
    async getAdmins() {
      try {
        const admin = await Admin.find().sort({ createdAt: -1 });
        return admin;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async loginAdmin(_, { email, password }) {
      const admin = await Admin.findOne({ email });

      /* if (!admin) {
        const errors = "User not found";
        console.log(errors);
        return errors;
      }*/

      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
        const wrongError = "Wrong credentials";

        return wrongError;
      }
      const token = generateToken(admin);
      return { ...admin._doc, id: admin._id, token };
    },

    async createAdmin(
      _,
      { adminInput: { name, surname, phoneNumber, email, password } }
    ) {
      password = await bcrypt.hash(password, 12);

      const newAdmin = new Admin({
        name,
        surname,
        phoneNumber,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newAdmin.save();
      const token = generateToken(res);

      return { ...res._doc, id: res._id, token };
    },
  },
};
