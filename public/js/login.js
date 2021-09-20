console.log("login js connected")

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

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
    if (response.status===400){
      //change these to modals
      alert("Incorrect email or password, please try again")
    }
    else {
      alert(response.statusText);
    }
  }
};

var radios = document.querySelectorAll('input[name="userRadio"]');
const nannyQuestions = document.getElementById('nannyQuestions');
nannyQuestions.style.display = "none"
const parentQuestions = document.getElementById('parentQuestions');
parentQuestions.style.display= "none"

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    console.log(radio.value)
    if(radio.value == "nanny"){
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

  let user_type ="";
  const name = document.querySelector('#name-signup').value.trim(); 
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const bio = document.querySelector('#userBio').value.trim();
  const numberOfKids = document.querySelector('#numberOfKids').value;
  const experienceYears = document.querySelector('#experience_years').value;
  const certifications = document.querySelector('#certifications').value;
  const hourlyRate = document.querySelector('#hourly_rate').value;
  const ageRange = document.querySelector('#age_range').value;

  //needed to determine if the user is a parent or nanny 
    //nannys leave this field null, parents can't
  if (numberOfKids.value == !null){
    user_type="parent"
  }else{
    user_type="nanny"
  }

  if (name && email && password && bio, numberOfKids, user_type, experienceYears, certifications, hourlyRate, ageRange) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, bio, numberOfKids, user_type, experienceYears, certifications, hourlyRate, ageRange }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/profile');
      console.log("successful signup")
      console.log(response)
    } else {
      alert(response.statusText);
      console.log("sign up did not work")
      console.log(response)

    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
