//import { response } from 'express';

export const registerUser = user => {
  return fetch('api/user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('error has occur');
      return err;
    });
};

export const findUserByProfile = (params, credentials) => {
  return fetch('/api/user/' + params.userId, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const deleteUser = (params, credentials) => {
  return fetch('/api/user/' + params.userId, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
