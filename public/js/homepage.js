console.log("homepage js connected")

const communicationFormHandler = async (event) => {
    event.preventDefault();
    console.log(event.target);

    let nannyId = event.target.getAttribute('data-id')
    let message = document.querySelector('#receiver_id' + nannyId).value;
    console.log(message, nannyId);

    if (message) {
        const response = await fetch('/api/communication', {
            method: 'POST',
            body: JSON.stringify({ receiver_id: nannyId, message: message }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            console.log("Success!")
            document.querySelector('#receiver_id' + nannyId).value = "";
        }
    }
}

const btns = document.querySelectorAll('.send-message');
[...btns].forEach(btn => btn.addEventListener('click', communicationFormHandler))