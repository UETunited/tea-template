export function getToken() {
  return localStorage.getItem('token');
}

const baseApiUrl = document.querySelector('body').dataset.baseapiurl;
export function makeJsonRequest(method, path, data) {
  const requestOptions = {
    method,
    body: JSON.stringify(data),
    headers: {
      'x-authorization': getToken(),
    },
  };
  return fetch(`${baseApiUrl}/${path}`, requestOptions)
    .then((response) => {console.log(response.status); return response.json()})
    .catch((err) => {
      console.log(err);
    });
}
