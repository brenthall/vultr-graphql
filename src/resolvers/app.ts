import { vultr } from "../vultr";

const resource = "app";

export default {
  Query: {
    app: async () => await vultr.query({ resource, cache: true })
  }
};
