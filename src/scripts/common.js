export function getToken() {
  return localStorage.getItem('token');
}

export class BadRequestError {
  constructor(content) {
    this.content = content;
  }
}

const baseApiUrl = document.querySelector('body').dataset.baseapiurl;
const apiVersion = document.querySelector('body').dataset.apiversion;
export function makeJsonRequest(method, path, data) {
  const requestOptions = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      Authorization: getToken(),
    },
  };
  return fetch(`${baseApiUrl}${path}`, requestOptions).then((response) => {
    if (response.status === 401) throw 'UNAUTHORIZED';
    else if (response.status === 400 || response.status === 422)
      throw new BadRequestError(response.json());
    else if (response.status === 404) throw 'NOT_FOUND';
    else if (response.status === 403) throw 'FORBIDDEN';
    else if (response.status > 400) {
      console.log(response);
      throw 'INTERNAL_ERROR';
    } // general internal error

    return response.json();
  });
}

export function validate(element, config, value) {
  console.log(element.dataset, element.value, value)
  const rules = JSON.parse(element.dataset.rules);
  if (!Iodine.isValid(element.value, rules)) {
    config.error = true;
  } else {
    config.error = false;
  }
}