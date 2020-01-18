export const signin = user => {
  return fetch('/api/signin/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify()
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const signout = () => {
  return fetch('/api/singout/', {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
