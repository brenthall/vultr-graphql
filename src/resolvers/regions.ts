import { vultr } from "../vultr";

const resource = "regions";

export default {
  Query: {
    regions: async () => await vultr.query({ resource, cache: true })
  }
};
