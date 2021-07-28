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
    id: 1,
    status: "Doctor required",
    color: "#63BFF230",
  },
  {
    id: 2,
    status: "Patient in",
    color: "#FA700C30",
  },
  {
    id: 3,
    status: "Assistant in",
    color: "#F2D77530",
  },
  {
    id: 4,
    status: "Emergency",
    color: "#FC666630",
  },
];

let rooms = [
  {
    id: 1,
    name: "1a",
    ownerId: "1",
    ownerName: "Who",
  },
  {
    id: 2,
    name: "2b",
    ownerId: "4",
    ownerName: "Mister",
  },
  {
    id: 3,
    name: "2g",
    ownerId: "4",
    ownerName: "Mister",
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
    getDoctors: () => {
      return users.filter((user) => user.role === "Doctor");
    },
    getRooms: () => {
      return rooms;
    },
    getAlerts: () => {
      return alerts;
    },
  },
  Mutation: {
    createAlert: (_: any, args: any) => {
      const { status, color } = args;
      alerts.push({ ...args, id: Date.now() });
      console.log(alerts);
      console.log(status, "color:", color);
      return args;
    },
  },
  User: {
    rooms: (user: any) => {
      return rooms.filter((rooms) => +rooms.ownerId === +user.id);
    },
  },
};

module.exports = resolvers;
