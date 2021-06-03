import client from "../../client";

export default {
  Mutation: {
    unfollow: async (_, { username }, { loggedInUser }) => {
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
            disconnect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    },
  },
};
