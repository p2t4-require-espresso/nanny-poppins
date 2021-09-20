const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
    console.log("logout hit")
  } else {
    alert(response.statusText);
   console.log("error w log out")
  }
};

document.querySelector('#logout').addEventListener('click', logout);
