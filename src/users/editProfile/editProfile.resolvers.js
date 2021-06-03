import client from "../../client";
import bcrypt from "bcrypt";
import { protectResolver } from "../users.util";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          password: newPassword,
          avatarURL,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            name,
            location,
            avatarURL,
            githubUsername,
            ...(hashedPassword && { password: hashedPassword }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Couldn't edit profile",
          };
        }
      }
    ),
  },
};
