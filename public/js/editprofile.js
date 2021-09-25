console.log("edit profile js connected")

const updateProfileHandler = async function(event){
    event.preventDefault();
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~')



    const name = document.querySelector('#name-signup').value.trim();

  const email = document.querySelector('#email-signup').value.trim();

  const bio = document.querySelector('#userBio').value.trim();

//   const number_of_children = document.querySelector('#numberOfKids').value;

  const experience_years = document.querySelector('#experience_years').value;

  const certification = document.querySelector('#certifications').value;

  const hourly_rate = document.querySelector('#hourly_rate').value;

  const nanny_age = document.querySelector('#nannyAge').value;

  const age_range = document.querySelector('#age_range').value;

 
  if (name || email || bio  || certification || hourly_rate || age_range || experience_years || nanny_age) {
        const response=  await fetch(`api/users/${id}`,  {
      method: 'PUT',
      body: JSON.stringify({name, email, bio, nanny_age,age_range,experience_years,certification,hourly_rate }),
      headers: {
        'Content-Type': 'application/json'
      }
  })
  console.log(response)
  if(response.ok){
  document.location.replace('/dashboard/profile');
    }
}
}
    document.querySelector('.updateProfile-form')
.addEventListener('submit', updateProfileHandler)
