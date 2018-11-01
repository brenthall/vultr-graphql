import { vultr } from "../vultr";

const resource = "dns";

export default {
  Query: {
    dns: async () => await vultr.query({ resource }),

    dnsRecords: async (_, args) =>
      await vultr.query({ resource, action: "records", args }),

    dnssecInfoDNS: async (_, args) =>
      await vultr.query({ resource, action: "dnssec_info", args, item: true }),

    soaInfoDNS: async (_, args) =>
      await vultr.query({ resource, action: "soa_info", args, item: true })
  },
  Mutation: {
    createDomainDNS: async (_, args) =>
      await vultr.mutate({ resource, action: "create_domain", args }),

    createRecordDNS: async (_, args) =>
      await vultr.mutate({ resource, action: "create_record", args }),

    deleteRecordDNS: async (_, args) =>
      await vultr.mutate({ resource, action: "delete_record", args }),

    dnssecEnableDNS: async (_, args) =>
      await vultr.mutate({ resource, action: "dnssec_enable", args }),

    soaUpdateDNS: async (_, { input }) =>
      await vultr.mutate({ resource, action: "soa_update", args: input }),

    updateRecordDNS: async (_, { input }) =>
      await vultr.mutate({ resource, action: "update_record", args: input })
  }
};
