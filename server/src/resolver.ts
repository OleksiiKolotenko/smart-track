const users = [
  {
    id: 1,
    name: "Who",
  },
  {
    id: 10,
    name: "Watson",
  },
];

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
  },
};

module.exports = resolvers;
