import fetch from 'isomorphic-fetch';

export default {
  fetchData(page) {
    return fetch('https://data.sfgov.org/resource/6a9r-agq8.json');
  }
};