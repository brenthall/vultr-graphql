import { vultr } from "../vultr";

const resource = "os";

export default {
  Query: {
    os: async () => await vultr.query({ resource })
  }
};
