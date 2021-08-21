const checkPassword = require("../helpers/checkHashedPassword");
const hashPassword = require("../helpers/hashPassword");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");
class userController {
  static async login(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username: username } });
      console.log(user);
      if (user) {
        const isPasswordMatch = checkPassword(password, user.password);
        if (isPasswordMatch) {
          const token = generateToken({ username });
          console.log(token);
          res.status(200).json({ access_token: token });
        } else {
          next({
            name: "BADUSERPASS",
            message: "Username atau Password salah",
          });
        }
      } else {
        next({
          name: "BADUSERPASS",
          message: "Username atau Password salah",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async changePassword(req, res, next) {
    const { password, newPassword } = req.body;
    try {
      // console.log(req.body, req.user);
      const user = await User.findOne({
        where: { username: req.user.username },
      });

      console.log(user);
      const isPasswordMatch = checkPassword(password, user.password);
      if (isPasswordMatch) {
        if (newPassword.length < 6) {
          next({ name: "PASSLENGTH" });
        } else {
          const encrypted = hashPassword(newPassword);
          await User.update(
            { password: encrypted },
            { where: { username: req.user.username } }
          );
          res.status(200).json({ message: "Password Changed" });
        }
      } else {
        next({
          name: "BADUSERPASS",
          message: "Password salah",
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = userController;
