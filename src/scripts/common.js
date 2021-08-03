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
      'Authorization': getToken(),
    },
  };
  return fetch(`${baseApiUrl}${path}`, requestOptions)
    .then((response) => {
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/auth/login/'
      }
      if (response.status === 400) // show error 
      if (response.status === 404) // show not found error
      if (response.status > 400) // general error, show toast
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
