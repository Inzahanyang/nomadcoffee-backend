import client from "../../client";

export default {
  Query: {
    seeCategories: (_, { page }) =>
      client.category.findMany({
        take: 2,
        skip: (page - 1) * 2,
        include: {
          shops: {
            select: {
              name: true,
            },
          },
        },
      }),
  },
};
