import { vultr } from "../vultr";

const resource = "server";

export default {
  Query: {
    server: async () => await vultr.query({ resource }),

    appChangeListServer: async (_, args) =>
      await vultr.query({ resource, action: "app_change_list", args }),

    osChangeListServer: async (_, args) =>
      await vultr.query({ resource, action: "os_change_list", args }),

    privateNetworksServer: async (_, args) =>
      await vultr.query({ resource, action: "private_networks", args }),

    listIpv4Server: async (_, args) =>
      await vultr.query({ resource, action: "list_ipv4", args }),

    listIpv6Server: async (_, args) =>
      await vultr.query({ resource, action: "reverse_list_ipv6", args }),

    reverseListIpv6Server: async (_, args) =>
      await vultr.query({ resource, action: "list_ipv4", args }),

    neighborsServer: async (_, args) =>
      await vultr.query({ resource, action: "neighbors", args }),

    isoStatusServer: async (_, args) =>
      await vultr.query({ resource, action: "iso_status", args }),

    upgradePlanListServer: async (_, args) =>
      await vultr.query({ resource, action: "upgrade_plan_list", args }),

    getAppInfoServer: async (_, args) =>
      await vultr.query({ resource, action: "get_app_info", args }),

    getUserDataServer: async (_, args) =>
      await vultr.query({ resource, action: "get_user_data", args }),

    async bandwidthServer(_, args) {
      const { incoming_bytes, outgoing_bytes } = await vultr.query({
        resource,
        action: "bandwidth",
        args,
        item: true
      });

      const incoming = incoming_bytes.map(item => ({
        date: item[0],
        incoming: item[1]
      }));

      const outgoing = outgoing_bytes.map(item => ({
        date: item[0],
        outgoing: item[1]
      }));

      return incoming.map(incomingItem => ({
        ...outgoing.find(
          outgoingItem => outgoingItem.date === incomingItem.date
        ),
        ...incomingItem
      }));
    }
  },

  Mutation: {
    createServer: async (_, { input }) =>
      await vultr.mutate({ resource, action: "create", args: input }),

    rebootServer: async (_, args) =>
      await vultr.mutate({ resource, action: "reboot", args }),

    haltServer: async (_, args) =>
      await vultr.mutate({ resource, action: "halt", args }),

    startServer: async (_, args) =>
      await vultr.mutate({ resource, action: "start", args }),

    reinstallServer: async (_, args) =>
      await vultr.mutate({ resource, action: "reinstall", args }),

    destroyServer: async (_, args) =>
      await vultr.mutate({ resource, action: "destroy", args }),

    backupEnableServer: async (_, args) =>
      await vultr.mutate({ resource, action: "backup_enable", args }),

    backupDisableServer: async (_, args) =>
      await vultr.mutate({ resource, action: "backup_disable", args }),

    ipv6EnableServer: async (_, args) =>
      await vultr.mutate({ resource, action: "ipv6_enable", args }),

    isoDetachServer: async (_, args) =>
      await vultr.mutate({ resource, action: "iso_detach", args }),

    backup_get_scheduleServer: async (_, args) =>
      await vultr.mutate({ resource, action: "backup_get_schedule", args }),

    backup_set_scheduleServer: async (_, args) =>
      await vultr.mutate({ resource, action: "backup_set_schedule", args }),

    create_ipv4Server: async (_, args) =>
      await vultr.mutate({ resource, action: "create_ipv4", args }),

    destroy_ipv4Server: async (_, args) =>
      await vultr.mutate({ resource, action: "destroy_ipv4", args }),

    firewall_group_setServer: async (_, args) =>
      await vultr.mutate({ resource, action: "firewall_group_set", args }),

    iso_attachServer: async (_, args) =>
      await vultr.mutate({ resource, action: "iso_attach", args }),

    label_setServer: async (_, args) =>
      await vultr.mutate({ resource, action: "label_set", args }),

    os_changeServer: async (_, args) =>
      await vultr.mutate({ resource, action: "os_change", args }),

    private_network_disableServer: async (_, args) =>
      await vultr.mutate({ resource, action: "private_network_disable", args }),

    private_network_enableServer: async (_, args) =>
      await vultr.mutate({ resource, action: "private_network_enable", args }),

    restore_backupServer: async (_, args) =>
      await vultr.mutate({ resource, action: "restore_backup", args }),

    restore_snapshotServer: async (_, args) =>
      await vultr.mutate({ resource, action: "restore_snapshot", args }),

    reverse_default_ipv4Server: async (_, args) =>
      await vultr.mutate({ resource, action: "reverse_default_ipv4", args }),

    reverse_delete_ipv6Server: async (_, args) =>
      await vultr.mutate({ resource, action: "reverse_delete_ipv6", args }),

    reverse_set_ipv4Server: async (_, args) =>
      await vultr.mutate({ resource, action: "reverse_set_ipv4", args }),

    reverse_set_ipv6Server: async (_, args) =>
      await vultr.mutate({ resource, action: "reverse_set_ipv6", args }),

    set_user_dataServer: async (_, args) =>
      await vultr.mutate({ resource, action: "set_user_data", args }),

    tag_setServer: async (_, args) =>
      await vultr.mutate({ resource, action: "tag_set", args }),

    upgrade_planServer: async (_, args) =>
      await vultr.mutate({ resource, action: "upgrade_plan", args })
  },

  Server: {
    region: async ({ DCID }) =>
      await vultr
        .query({ resource: "regions", cache: true })
        .then(result => result.find(item => item.DCID == DCID)),

    plan: async ({ VPSPLANID }) =>
      await vultr
        .query({ resource: "plans", cache: true })
        .then(result => result.find(item => item.VPSPLANID == VPSPLANID)),

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
