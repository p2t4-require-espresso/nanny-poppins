console.log("profile js connected")

const communicationFormHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);

  let parentId = event.target.getAttribute('data-id')
  let message = document.querySelector('#receiver_id' + parentId).value;
  console.log(message, parentId);

  if (message) {
      const response = await fetch('/api/communication', {
          method: 'POST',
          body: JSON.stringify({ receiver_id: parentId, message: message }),
          headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
          console.log("Success!")
      }
  }
}

const btns = document.querySelectorAll('.send-reply');
[...btns].forEach(btn => btn.addEventListener('click', communicationFormHandler))

const reviewFormHandler = async (event) => {
  event.preventDefault();

  let nanny_review = document.querySelector('#nanny-review').value;
  let nannyId= document.querySelector('#nanny_id').value;
  
  if (nanny_review) {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ nanny_id: nannyId, review: nanny_review }),
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
document
  .querySelector('.review-form')
  .addEventListener('submit', reviewFormHandler);