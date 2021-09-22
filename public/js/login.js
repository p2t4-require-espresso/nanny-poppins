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
  const number_of_children = document.querySelector('#numberOfKids').value;
  const experience_years = document.querySelector('#experience_years').value;
  const certification = document.querySelector('#certifications').value;
  const hourly_rate = document.querySelector('#hourly_rate').value;
  const nanny_age = document.querySelector('#nannyAge').value;
  const age_range = document.querySelector('#age_range').value;

  //needed to determine if the user is a parent or nanny 
   
    console.log(number_of_children,"number of children")
    console.log(typeof number_of_children, "# of children type")
    console.log(typeof nanny_age, "nanny age type")
    console.log(typeof hourly_rate, "hourly rate type")
    console.log(typeof certification ,"certification type")
    console.log(typeof age_range, "age range type")
  
    //setting this to '' fixes the issue of all users entering the db as a nanny
  if (experience_years === ''){
    user_type="parent"
  }else{
    user_type="nanny"
  }
  
  if (name && email && password && bio && user_type &&  (number_of_children  || (certification && hourly_rate && age_range && experience_years && nanny_age))) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, bio, number_of_children, user_type, photo, experience_years, certification,  hourly_rate,nanny_age, age_range }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/profile');
      console.log("successful signup")
   
    } else {
      alert(response.statusText);
      console.log("sign up did not work")
      console.log(await response.json())
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
