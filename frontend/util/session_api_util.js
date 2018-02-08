export const login = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    dataType: 'json',
    data: { user: user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session',
    dataType: 'json'
  })
);

export const signup = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    dataType: 'json',
    data: { user: user }
  })
);

export const demo = () => (
  $.ajax({
    method: 'GET',
    url: '/api/users/demo',
    dataType: 'json'
  })
);