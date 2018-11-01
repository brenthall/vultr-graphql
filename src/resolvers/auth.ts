import { vultr } from "../vultr";

const resource = "auth";

export default {
  Query: {
    auth: async () =>
      await vultr.query({ resource, action: "info", item: true })
  }
};
