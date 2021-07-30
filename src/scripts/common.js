export function getToken() {
  return localStorage.getItem('token');
}

const baseApiUrl = document.querySelector('body').dataset.baseapiurl;
const apiVersion = document.querySelector('body').dataset.apiversion;
export function makeJsonRequest(method, path, data) {
  const requestOptions = {
    method,
    body: JSON.stringify(data),
    headers: {
      'x-authorization': getToken(),
    },
  };
  return fetch(`${baseApiUrl}/${apiVersion}/${path}`, requestOptions)
    .then((response) => {console.log(response.status); return response.json()})
    .catch((err) => {
      console.log(err);
    });
}
