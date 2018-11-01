import { vultr } from "../vultr";

const resource = "plans";

export default {
  Query: {
    plans: async (_, args) => await vultr.query({ resource, args })
  }
};
