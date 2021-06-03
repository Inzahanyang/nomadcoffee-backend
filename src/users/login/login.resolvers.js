import jwt from "jsonwebtoken";
import bcryt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findFirst({ where: { username } });
        if (!user) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        const passwordOk = await bcryt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "Incorrect password",
          };
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        return {
          ok: true,
          token,
        };
      } catch {
        return {
          ok: false,
          error: "Couldn't login",
        };
      }
    },
  },
};
