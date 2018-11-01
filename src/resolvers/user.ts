import { vultr } from "../vultr";

const resource = "user";

export default {
  Query: {
    user: async () => await vultr.query({ resource })
  }
};
