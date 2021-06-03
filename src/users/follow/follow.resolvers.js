import client from "../../client";
import { protectResolver } from "../users.util";

export default {
  Mutation: {
    follow: protectResolver(async (_, { username }, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: { username },
      });

      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }

      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          followings: {
            connect: {
              username,
            },
          },
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
