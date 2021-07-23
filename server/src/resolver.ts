let users = [
  {
    id: 1,
    name: "Who",
    role: "Doctor",
    email: "doctor@gmail.com",
    phone: 38097373738,
  },
  {
    id: 2,
    name: "Watson",
    role: "Assistant",
    phone: 38068686868,
  },
];

let alerts = [
  {
    number: 1,
    status: "Doctor required",
    color: "#63BFF230",
  },
  {
    number: 2,
    status: "Patient in",
    color: "#FA700C30",
  },
  {
    number: 3,
    status: "Assistant in",
    color: "#F2D77530",
  },
  {
    number: 4,
    status: "Emergency",
    color: "#FC666630",
  },
];

let rooms = [
  {
    id: 1,
    name: "1a",
  },
  {
    id: 2,
    name: "2b",
  },
];

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getAlerts: () => {
      return alerts;
    },
    getRooms: () => {
      return rooms;
    },
  },
};

module.exports = resolvers;
