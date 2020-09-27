export const favoritos = {
  post: async (id_user, id_movie) => {
    const dataToSend = {id_user, id_movie};
    return await fetch('http://192.168.0.105:8002/api/movie/favorites/store', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((res) => res)
      .catch((err) => console.log(err, 'eruuuror'));
  },
  get: async (id_user) => {
    return await fetch('http://192.168.0.105:8002/api/movie/favorites/lists', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      body: JSON.stringify({id_user}),
    })
      .then((res) => res.json())
      .then((res) => res);
  },
};

export const movies = {
  getDetail: async (id_movie) => {
    return await fetch('http://192.168.0.105:8002/api/movie/detail', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({id_movie}),
    })
      .then((res) => res.json())
      .then((res) => res);
  },
};

export const user = {
  post: async (data) => {
    return await fetch('http://192.168.0.105:8002/api/user/store', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res);
  },
};
