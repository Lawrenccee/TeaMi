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

export const fetchUser = (userId) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`,
    dataType: 'json'
  })
);

export const updateUser = ({formData, user}) => {
  return ($.ajax({
    url: `/api/users/${user}`,
    type: 'PATCH',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  }));
};