import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { categoryName, page }) =>
      client.category.findFirst({
        where: {
          name: categoryName,
        },
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
