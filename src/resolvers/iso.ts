import { vultr } from "../vultr";

const resource = "iso";

export default {
  Query: {
    iso: async () => await vultr.query({ resource })
  }
};
