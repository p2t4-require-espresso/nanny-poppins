

console.log("upload image js connected")


const formImageHandler = async function(event){
    event.preventDefault();
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
    var fd = new FormData();
    const photo = document.querySelector('#photo').files[0]
    fd.append("photo", photo);

  const response=  await fetch('api/users/upload',{
      method: 'POST',
      body: fd
  })
  if(response.ok){
  document.location.replace('/dashboard/profile');
    }
}
    document.querySelector('#submitForm')
.addEventListener('submit', formImageHandler)
