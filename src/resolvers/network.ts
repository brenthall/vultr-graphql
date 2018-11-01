import { vultr } from "../vultr";

const resource = "network";

export default {
  Query: {
    network: async () => await vultr.query({ resource })
  },
  Mutation: {
    createNetwork: async (_, { input }) =>
      await vultr.mutate({
        resource,
        action: "create",
        args: input,
        status: true
      }),

    destroyNetwork: async (_, args) =>
      await vultr.mutate({ resource, action: "destroy", args, status: true })
  },
  Network: {
    region: async ({ DCID }) =>
      await vultr
        .query({ resource: "regions", cache: true })
        .then(result => result.find(item => item.DCID == DCID))
  }
};
