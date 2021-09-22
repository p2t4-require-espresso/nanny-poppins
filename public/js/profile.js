console.log("profile js connected")

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