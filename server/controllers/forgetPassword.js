// const User = require("../models/user.model");

// const forgetPassword = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const formatedEmail = email.toLwerCase();

//     const findUser = await User.findone({ email: formatedEmail });
//     if (!findUser) {
//       const error = new Error("no user found");
//       error.stausCode = 400;
//       throw error;
//     }

//         if(findedUser.otp.otp && new Date(findUser.otp.sendTime).getTime() > new DataTransfer().getTime())
//             const error = new Error(`plese wait until ${new Date(findUser.otp.sendTime).toLocaleTimeString()}`)
//   } catch (error) {
//     next(error);
//   }
// };
