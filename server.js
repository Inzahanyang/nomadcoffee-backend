require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.util";

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`🩹 Server is running on http://localhost:${PORT} 🟢`)
  );
