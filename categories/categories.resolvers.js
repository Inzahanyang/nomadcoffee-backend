import client from "../client";

export default {
  Category: {
    totalCoffeeShop: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
