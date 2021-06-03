import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifyToken) {
      const user = await client.user.findUnique({
        where: { id: verifyToken["id"] },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export function protectResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action",
      };
    }
    return ourResolver(root, args, context, info);
  };
}
