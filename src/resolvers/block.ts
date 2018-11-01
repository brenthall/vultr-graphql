import { vultr } from "../vultr";

const resource = "block";

export default {
  Query: {
    block: async () => await vultr.query({ resource })
  },
  Mutation: {
    attachStorage: async (_, args) =>
      await vultr.mutate({ resource, action: "attach", args }),

    createStorage: async (_, args) =>
      await vultr.mutate({ resource, action: "create", args }),

    deleteStorage: async (_, args) =>
      await vultr.mutate({ resource, action: "delete", args }),

    detachStorage: async (_, args) =>
      await vultr.mutate({ resource, action: "detach", args }),

    labelSetStorage: async (_, args) =>
      await vultr.mutate({ resource, action: "label_set", args }),

    resizeStorage: async (_, args) =>
      await vultr.mutate({ resource, action: "resize", args })
  },
  Block: {
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
