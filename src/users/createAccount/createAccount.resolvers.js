import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });
      if (existingUser) {
        return {
          ok: false,
          error: "username or email already taken",
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);

      await client.user.create({
        data: {
          username,
          email,
          name,
          location,
          avatarURL,
          githubUsername,
          password: hashPassword,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
