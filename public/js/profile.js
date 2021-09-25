console.log("profile js connected")

function sendAlert(status, color, element) {
  $(".bootstrap-growl").remove();
  $.bootstrapGrowl(status, {
    ele: element,
    type: color,
    align: 'center',
    delay: 2000,
  });
}


const reviewFormHandler = async (event) => {
  event.preventDefault();

  let nanny_review = document.querySelector('#nanny-review').value;
  let nanny_star = document.querySelector('#starRating').value;
  console.log(typeof nanny_star, "nanny star")
  let nannyId= document.querySelector('#nanny_id').value;

  if(nannyId==='Choose Nanny'){
    sendAlert('Must choose a nanny before submitting a review.', 'danger', '#reviewSubmit')
  }
  //user able to send either a review of a nanny by submitting a star rating alone, or also typing in a review alongside a star rating
  if (nannyId !=='Choose Nanny' && (nanny_review || nanny_star)) {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ nanny_id: nannyId, review: nanny_review , stars: nanny_star}),
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
document
  .querySelector('.review-form')
  .addEventListener('submit', reviewFormHandler);