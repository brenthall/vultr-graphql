import { vultr } from "../vultr";

const resource = "account";

export default {
  Query: {
    account: async () =>
      await vultr.query({ resource, action: "info", item: true })
  }
};
