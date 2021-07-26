let users = [
  {
    id: 1,
    name: "Who",
    role: "Doctor",
    email: "doctor@gmail.com",
    phone: +38097373738,
  },
  {
    id: 2,
    name: "Watson",
    role: "Assistant",
    email: "assistant@gmail.com",
    phone: +38068686868,
  },
  {
    id: 3,
    name: "Ray",
    role: "Receptionist",
    email: "recep@gmail.com",
    phone: +38050282280,
  },
  {
    id: 4,
    name: "Mister",
    role: "Doctor",
    email: "doctor2@gmail.com",
    phone: +38050285280,
  },
  {
    id: 5,
    name: "Helper",
    role: "Receptionist",
    email: "recep2@gmail.com",
    phone: +38050285280,
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
    getByRole: (_: any, params: any) => {
      return users.filter((user) => user.role === params.role);
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
