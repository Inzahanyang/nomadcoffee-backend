import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { page }) =>
      client.coffeeShop.findMany({
        take: 2,
        skip: (page - 1) * 2,
      }),
  },
};
