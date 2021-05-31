import client from "../client";

export default {
  User: {
    followers: async ({ username }, { page }) =>
      client.user
        .findUnique({ where: { username } })
        .followers({ take: 2, skip: (page - 1) * 2 }),

    followings: ({ username }, { page }) =>
      client.user
        .findUnique({ where: { username } })
        .followings({ take: 2, skip: (page - 1) * 2 }),
  },
};
