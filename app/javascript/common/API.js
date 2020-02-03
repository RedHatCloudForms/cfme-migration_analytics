const { API } = window;

// TODO this is probably unnecessary, it was copied from v2v and originally used axios directly,
// but was kept around to maintain the call and response signature without changing all the usages.
// We might want to refactor action creators to instead use window.API directly.

export default {
  get(url, headers = {}, params = {}, otherOptions = {}) {
    return API.get(url, {
      transformResponse: e => ({ data: e }),
      headers,
      params,
      ...otherOptions
    });
  },
  put(url, data = {}, headers = {}, otherOptions = {}) {
    return API.put(url, data, {
      headers,
      ...otherOptions
    });
  },
  post(url, data = {}, headers = {}, otherOptions = {}) {
    return API.post(url, data, {
      headers,
      transformResponse: e => ({ data: e }),
      ...otherOptions
    });
  },
  delete(url, headers = {}, otherOptions = {}) {
    return API.delete(url, {
      headers,
      ...otherOptions
    });
  },
  patch(url, data = {}, headers = {}, otherOptions = {}) {
    return API.patch(url, data, {
      headers,
      ...otherOptions
    });
  }
};
