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
      document.location.replace('/profile');
    } else {
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

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const photo = document.querySelector('#profilePic').value;
  const bio = document.querySelector('#userBio').value;
  const numberOfKids = document.querySelector('#numberOfKids').value;
  const experienceYears = document.querySelector('#experience_years').value;
  const certifications = document.querySelector('#certifications').value;
  const hourlyRate = document.querySelector('#hourly_rate').value;
  const ageRange = document.querySelector('#age_range').value;


  if (name && email && password && photo && bio && numberOfKids && experienceYears && certifications && hourlyRate && ageRange) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
