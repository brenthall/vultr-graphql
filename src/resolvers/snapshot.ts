import { vultr } from "../vultr";

const resource = "snapshot";

export default {
  Query: {
    snapshot: async () => await vultr.query({ resource })
  },
  Mutation: {
    createSnapshot: async (_, args) =>
      await vultr.mutate({ resource, action: "create", args, status: true }),

    createFromUrlSnapshot: async (_, args) =>
      await vultr.mutate({
        resource,
        action: "create_from_url",
        args,
        status: true
      }),

    destroySnapshot: async (_, args) =>
      await vultr.mutate({ resource, action: "destroy", args, status: true })
  },

  Snapshot: {
    os: async ({ OSID }) =>
      await vultr
        .query({ resource: "os", cache: true })
        .then(result => result.find(item => item.OSID == OSID)),

    app: async ({ APPID }) =>
      await vultr
        .query({ resource: "app", cache: true })
        .then(result => result.find(item => item.APPID == APPID))
  }
};
