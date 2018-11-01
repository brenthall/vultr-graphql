import { vultr } from "../vultr";

const resource = "reservedip";

export default {
  Query: {
    reservedip: async () => await vultr.query({ resource })
  },
  Mutation: {
    createReservedIp: async (_, { input }) =>
      await vultr.mutate({ resource, action: "create", args: input }),

    attachReservedIp: async (_, { input }) =>
      await vultr.mutate({ resource, action: "attach", args: input }),

    detachReservedIp: async (_, { input }) =>
      await vultr.mutate({ resource, action: "detach", args: input }),

    convertReservedIp: async (_, { input }) =>
      await vultr.mutate({ resource, action: "convert", args: input }),

    destroyReservedIp: async (_, args) =>
      await vultr.mutate({ resource, action: "destroy", args })
  },
  ReservedIp: {
    region: async ({ DCID }) =>
      await vultr
        .query({ resource: "regions", cache: true })
        .then(result => result.find(item => item.DCID == DCID)),

    server: async ({ attached_to_SUBID }) =>
      await vultr
        .query({ resource: "server" })
        .then(result => result.find(item => item.SUBID == attached_to_SUBID))
  }
};
