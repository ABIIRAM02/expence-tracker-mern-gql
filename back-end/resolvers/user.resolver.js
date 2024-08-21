import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Query: {
    authUser:async (_,__,context) => {
        try {
            const user = await context.getUser()
            return user
        } catch (error) {
            console.error('Error while getting user:', error)
            throw new Error(error)
        }
    },
    user:async (_, { userId }) => {
        try {
            const user = await User.findById(userId)
            return user
        } catch (error) {
            console.error('Error while getting user:', error)
            throw new Error(error)            
        }
    }
  },
  Mutation: {
    signUp: async (_, input, context) => {
      //    TODO 1->check all fields are present
      //    TODO 2->check existing user
      //    TODO 3->hash the password
      //    TODO 4->generate pics
      //    TODO 5->create newUser
      //    TODO 6-> save,context and return the newUser

      try {
        const { input : {name, username, password, gender }} = input;
        
        if (!(name || username || password || gender)) {
          throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("user already exist");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const malePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femalePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          gender,
          password: hashedPassword,
          profilePic: gender === "male" ? malePic : femalePic,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error(error);
      }
    },
    login: async (_, input, context) => {
      try {
        const { input: {username, password} } = input;
        if (!(username || password)) throw new Error("Fields cannot be empty");

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        console.log(user);
        await context.login(user);
        return user;
      } catch (error) {
        console.error("error while login:", error);
        throw new Error(error.message);
      }
    },
    logout: async (_, input, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => { // ? delets cookie from server-side
          console.log(err);
        });
        context.res.clearCookie("connect.sid"); // ? delets cookie from client-side

        return { message: "logged out sucessfully" };
      } catch (error) {
        console.error("Error while logout: ", error);
      }
    },
  },
};

export default userResolver;
