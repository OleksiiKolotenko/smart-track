let users = [
  {
    id: 1,
    name: "Who",
    role: "Doctor",
    email: "doctor@gmail.com",
    phone: +38097373738,
    rooms: ["1a", "4b"],
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
    rooms: ["2b"],
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
];

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getByRole: (_: any, params: any) => {
      return users.filter((user) => user.role === params.role);
    },
    getRooms: () => {
      return rooms;
    },
    // getRoomsById: (_: any, params: any) => {
    //   return rooms.filter((rooms) => rooms.ownerId === params.ownerId);
    // },
    getAlerts: () => {
      return alerts;
    },
  },
  Mutation: {
    createAlert: (id: number, status: string, color: string) => {
      // const newAlert = { id, status, color };
      // alerts.push({ newAlert });
      // return newAlert;
    },
  },
};

module.exports = resolvers;
