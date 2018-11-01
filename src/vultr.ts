import axios from "axios";
import * as qs from "qs";
import * as LRUCache from "lru-cache";
import { cacheAdapterEnhancer } from "axios-extensions";

axios.defaults.baseURL = process.env.VULTR_API || "https://api.vultr.com/v1/";
axios.defaults.headers.common["API-Key"] = process.env.VULTR_KEY;

const withCache = axios.create({
  headers: { "API-Key": "" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    defaultCache: new LRUCache({ maxAge: 1000 * 60 * 60 * 24 * 1 }) // 1 day
  })
});

export const vultr = {
  // @param { Object } data - { '1': {...}, '2': {...} }
  // @returns { Array } - [ {...}, {...} ]
  flatten: data => [].concat(...Object.keys(data).map(key => data[key])),
  query: async ({
    resource = "",
    action = "list",
    args = {},
    item = false,
    cache = false
  } = {}) =>
    cache
      ? await withCache
          .get(`${resource}/${action}`, { params: { ...args } })
          .then(({ data }) => (item ? data : vultr.flatten(data)))
      : await axios
          .get(`${resource}/${action}`, {
            params: { ...args },
            headers: {
              API: ""
            }
          })
          .then(({ data }) => (item ? data : vultr.flatten(data))),
  mutate: async ({
    resource = "",
    action = "create",
    args = {},
    status = false
  } = {}) =>
    await axios
      .post(`${resource}/${action}`, qs.stringify(args))
      .then(response => (status ? response.statusText : response.data))
};
