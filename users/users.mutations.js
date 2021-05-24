import client from "../client";

export default {
  Mutation: {
    createUser: (_, { email }) => client.user.create({ data: { email } }),
    deleteUser: (_, { id }) => client.user.delete({ where: { id } }),
    updateUser: (_, { id, email }) =>
      client.user.update({
        where: { id },
        data: { email },
      }),
  },
};
