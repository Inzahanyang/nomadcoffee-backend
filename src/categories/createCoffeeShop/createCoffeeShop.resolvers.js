import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.util";
import { processCategories } from "../categories.utils";

export default {
  Mutation: {
    createCoffeeShop: protectResolver(
      async (
        _,
        { name: coffeeShopName, latitude, longitude, categoryName, photo },
        { loggedInUser }
      ) => {
        let categoryObj = [];
        if (categoryName) {
          categoryObj = processCategories(categoryName);
        }

        const fileUrl = await uploadToS3(photo, loggedInUser.id, "uploads");

        const coffeeShop = await client.coffeeShop.create({
          data: {
            name: coffeeShopName,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
            photos: {
              create: {
                url: fileUrl,
              },
            },
          },
        });
        if (coffeeShop) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
          };
        }
      }
    ),
  },
};
