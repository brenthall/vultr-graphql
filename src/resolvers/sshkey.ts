import { vultr } from "../vultr";

const resource = "sshkey";

export default {
  Query: {
    sshkey: async () => await vultr.query({ resource })
  },
  Mutation: {
    createSshKey: async (_, { input }) =>
      await vultr.mutate({ resource, action: "create", args: input }),
    updateSshKey: async (_, { input }) =>
      await vultr.mutate({
        resource,
        action: "update",
        args: input,
        status: true
      }),
    destroySshKey: async (_, args) =>
      await vultr.mutate({ resource, action: "destroy", args, status: true })
  }
};
