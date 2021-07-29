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
    getByRole: (_: void, params: { role: string }) => {
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
    createAlert: (_: void, args: { color: string; status: string }) => {
      const { color, status } = args;
      alerts.push({ ...args, id: Date.now() });
      return args;
    },
    editAlert: (
      _: void,
      args: { id: number; color: string; status: string }
    ) => {
      const { id, color, status } = args;
      alerts = alerts.map((obj) => {
        if (obj.id === +id) {
          return { id: +id, status, color };
        } else return obj;
      });
      return args;
    },
    createRoom: (_: void, args: any) => {
      const { name } = args;
      rooms.push({ ...args, id: Date.now() });
      return args;
    },
    editRoom: (
      _: void,
      args: { id: number; name: string; ownerId: string; ownerName: string }
    ) => {
      const { id, name, ownerId, ownerName } = args;
      rooms = rooms.map((obj) => {
        if (obj.id === +id) {
          return { id: +id, name, ownerId, ownerName };
        } else return obj;
      });
      return args;
    },
    deleteRoom: (_: void, args: { id: number }) => {
      const { id } = args;
      rooms = rooms.filter((obj) => {
        return +obj.id !== +id;
      });
      return args;
    },
    createUser: (
      _: void,
      args: { name: string; role: string; email: string; phone: number }
    ) => {
      const { name, role, email, phone } = args;
      users.push({ ...args, id: Date.now() });
      return args;
    },
    editUser: (
      _: void,
      args: {
        id: number;
        name: string;
        role: string;
        email: string;
        phone: number;
      }
    ) => {
      const { id, name, role, email, phone } = args;
      users = users.map((obj) => {
        if (obj.id === +id) {
          return { id: +id, name, role, email, phone };
        } else return obj;
      });
      return args;
    },
    deleteUser: (_: void, args: { id: number }) => {
      const { id } = args;
      users = users.filter((obj) => {
        return +obj.id !== +id;
      });
      rooms = rooms.map((obj) => {
        if (+obj.ownerId === +id) {
          return { ...obj, ownerName: "", ownerId: "" };
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
