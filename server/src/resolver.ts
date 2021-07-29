let users = [
  {
    id: 1,
    name: "Who",
    role: "Doctor",
    email: "doctor@gmail.com",
    phone: 380973788860,
  },
  {
    id: 2,
    name: "Watson",
    role: "Assistant",
    email: "assistant@gmail.com",
    phone: 380953588850,
  },
  {
    id: 3,
    name: "Ray",
    role: "Receptionist",
    email: "recep@gmail.com",
    phone: 380673722260,
  },
  {
    id: 4,
    name: "Mister",
    role: "Doctor",
    email: "doctor2@gmail.com",
    phone: 380753788866,
  },
  {
    id: 5,
    name: "Helper",
    role: "Receptionist",
    email: "recep2@gmail.com",
    phone: 380963728269,
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
    getByRole: (_: void, params: any) => {
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
    createAlert: (_: void, args: any) => {
      const { color, status } = args;
      alerts.push({ ...args, id: Date.now() });
      return args;
    },
    editAlert: (_: void, args: any) => {
      const { id, color, status } = args;
      alerts = alerts.map((obj) => {
        if (obj.id === parseInt(id)) {
          return { id: parseInt(id), status, color };
        } else return obj;
      });
      return args;
    },
    createRoom: (_: void, args: any) => {
      const { name } = args;
      rooms.push({ ...args, id: Date.now() });
      return args;
    },
    editRoom: (_: void, args: any) => {
      const { id, name, ownerId, ownerName } = args;
      rooms = rooms.map((obj) => {
        if (obj.id === parseInt(id)) {
          return { id: parseInt(id), name, ownerId, ownerName };
        } else return obj;
      });
      return args;
    },
    createUser: (_: void, args: any) => {
      const { name, role, email, phone } = args;
      users.push({ ...args, id: Date.now() });
      return args;
    },
    editUser: (_: void, args: any) => {
      const { id, name, role, email, phone } = args;
      users = users.map((obj) => {
        if (obj.id === parseInt(id)) {
          return { id: parseInt(id), name, role, email, phone };
        } else return obj;
      });
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
