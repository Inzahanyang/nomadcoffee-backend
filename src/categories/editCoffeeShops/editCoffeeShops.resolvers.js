import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.util";
import { processCategories } from "../categories.utils";

export default {
  Mutation: {
    editCoffeeShops: protectResolver(
      async (
        _,
        { id, name, latitude, longitude, photo, categories },
        { loggedInUser }
      ) => {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          select: {
            id: true,
          },
        });

        let categoryObj = [];
        let fileUrl = null;

        if (categories) {
          categoryObj = processCategories(categories);
        }

        if (photo) {
          fileUrl = await uploadToS3(photo, loggedInUser.id, "uploads");
        }

        const updatedCoffeeShop = await client.coffeeShop.update({
          where: {
            id: coffeeShop.id,
          },
          data: {
            name,
            latitude,
            longitude,
            ...(categoryObj.length > 0 && {
              categories: {
                set: [],
                connectOrCreate: categoryObj,
              },
            }),
            ...(fileUrl && {
              photos: {
                set: [],
                create: {
                  url: fileUrl,
                },
              },
            }),
          },
        });

        if (updatedCoffeeShop) {
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
