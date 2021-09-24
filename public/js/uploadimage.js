// const { response } = require("express");

// const { response } = require("express");

console.log("upload image js connected")


const formImageHandler = async function(event){
    event.preventDefault();
const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")
    event.preventDefault();
    var formdata = new FormData();
    formdata.append("image", fileInput.files[0], 'IMG_5401.jpg');
    var requestOptions = {
      method: 'POST',
      body: formdata, 
      redirect: 'follow'
    };
    await fetch('/upload', requestOptions)
       .then(response => response.text())
       .then(result => console.log(result))
       .catch(error => console.log(
           'error', error));
    }
    
    document.querySelector('#imageForm')
.addEventListener('submit', formImageHandler)
