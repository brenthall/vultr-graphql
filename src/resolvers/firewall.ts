import { vultr } from "../vultr";

const resource = "firewall";

export default {
  Query: {
    group_listFirewall: async (_, args) =>
      await vultr.query({ resource, action: "group_list", args }),

    rule_listFirewall: async (_, args) =>
      await vultr.query({ resource, action: "rule_list", args })
  },
  Mutation: {
    group_createFirewall: async (_, args) =>
      await vultr.mutate({ resource, action: "group_create", args }),

    group_deleteFirewall: async (_, args) =>
      await vultr.mutate({ resource, action: "group_delete", args }),

    group_set_descriptionFirewall: async (_, args) =>
      await vultr.mutate({ resource, action: "group_set_description", args }),

    rule_createFirewall: async (_, { input }) =>
      await vultr.mutate({ resource, action: "rule_create", args: input }),

    rule_deleteFirewall: async (_, args) =>
      await vultr.mutate({ resource, action: "rule_delete", args })
  }
};
