
console.log("login js connected")

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (!email || !password) {
    sendAlert("Must include email and password before signing in.", 'danger', '.login-button')
  }

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard/profile');
      console.log("user logged in")
    }
    if (response.status === 400) {
      sendAlert("Incorrect email or password, please try again.", 'danger', '.login-button');
    }
    else {
      sendAlert("Server Error, unable to login", 'danger', '.login-button');
    }
  }
};

//put this in helpers 
function sendAlert(status, color, element) {
  $(".bootstrap-growl").remove();
  $.bootstrapGrowl(status, {
    ele: element,
    type: color,
    align: 'center',
    delay: 2000,
  });
}

var radios = document.querySelectorAll('input[name="userRadio"]');
const nannyQuestions = document.getElementById('nannyQuestions');
nannyQuestions.style.display = "none"
const parentQuestions = document.getElementById('parentQuestions');
parentQuestions.style.display = "none"

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    console.log(radio.value)
    if (radio.value == "nanny") {
      nannyQuestions.style.display = "block";
      parentQuestions.style.display = "none";
    } else {
      nannyQuestions.style.display = "none"
      parentQuestions.style.display = "block";
    }
  })
});

const signupFormHandler = async (event) => {
  event.preventDefault();
try{
  //this allows the user to sign up with multipart form data
 const fd = new FormData();

  let user_type = "";
  // fd.append('user_type', user_type)
  const name = document.querySelector('#name-signup').value.trim();
  fd.append('name', name)
  const email = document.querySelector('#email-signup').value.trim();
  fd.append('email', email)
  const password = document.querySelector('#password-signup').value.trim();
  fd.append('password', password)
  const bio = document.querySelector('#userBio').value.trim();
  fd.append('bio', bio)
  const number_of_children = document.querySelector('#numberOfKids').value;
  fd.append('number_of_children', number_of_children)
  const experience_years = document.querySelector('#experience_years').value;
  fd.append('experience_years', experience_years)
  const certification = document.querySelector('#certifications').value;
  fd.append('certification', certification)
  const hourly_rate = document.querySelector('#hourly_rate').value;
  fd.append('hourly_rate', hourly_rate)
  const nanny_age = document.querySelector('#nannyAge').value;
  fd.append('nanny_age', nanny_age)
  const age_range = document.querySelector('#age_range').value;
  fd.append('age_range', age_range)
  const photo= document.querySelector('#photo').files[0];
  fd.append('photo', photo)


  if (!(name && email && password && bio && user_type && (number_of_children || (certification && hourly_rate && age_range && experience_years && nanny_age)))) {
    sendAlert("All Fields must have valid entries.", 'danger', '.signup-button')
  }

  //setting this to '' fixes the issue of all users entering the db as a nanny
  if (experience_years === '') {
    user_type = "parent"
    fd.append('user_type', user_type)
  } else {
    user_type = "nanny"
    fd.append('user_type', user_type)
  }

  // if (name && email && password && bio && user_type && (number_of_children || (certification && hourly_rate && age_range && experience_years && nanny_age))) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: fd
      // body: JSON.stringify({ name, email, password, bio, number_of_children, user_type, experience_years, certification, hourly_rate, nanny_age, age_range }),
      // headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard/profile');
      console.log("successful signup")

    } else {
      sendAlert('Error with signing up', 'danger', '.signup-button')
      console.log("sign up did not work", response)
    }
  // }
} catch(err){
  console.log(err)
}
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

