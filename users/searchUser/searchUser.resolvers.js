import client from "../../client";

export default {
  Query: {
    searchUser: (_, { keyword }) =>
      client.user.findMany({
        where: { username: { startsWith: keyword.toLowerCase() } },
      }),
  },
};
