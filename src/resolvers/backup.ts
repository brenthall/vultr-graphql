import { vultr } from "../vultr";

const resource = "backup";

export default {
  Query: {
    backup: async () => await vultr.query({ resource })
  }
};
