import { vultr } from "../vultr";

const resource = "startupscript";

export default {
  Query: {
    listStartupScript: async () => await vultr.query({ resource })
  },
  Mutation: {
    createStartupScript: async (_, { input }) =>
      await vultr.mutate({ resource, action: "create", args: input }),

    updateStartupScript: async (_, { input }) =>
      await vultr.mutate({ resource, action: "update", args: input }),

    destroyStartupScript: async (_, args) =>
      await vultr.mutate({ resource, action: "destroy", args })
  }
};
