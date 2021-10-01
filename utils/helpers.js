module.exports = {
  capitalLetter: (input) => {
    //ADDED this function to normalize some of the data going to the DB 
    const normalizeInput =input.toLowerCase()
    const words = normalizeInput.split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1)
    }
    return words.join(" ")
    },
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  }
};