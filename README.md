# Nanny-Poppins

## Description
Nanny Poppins is an app that helps get immediate daycare for busy parents. It is a service where parents and nannys go to find eachother. Users, either parents or nannys, sign up and are able to input information like a bio, certifications, years of experience, preferred age ranges of children they like to baby sit. 
By having them make an account, hire a nanny, and be able to write a reveiw about their nanny. This app also helps nannies get signed up and ready to work by having them create an account and be made able for on the spot hire. Features included are being able message your nanny and look at reveiws of each nannies on their profile.
 ## Table of Contents 
  
  * [User Story](#userstory)
  * [Deployment](#deployment)
<!--   * [Screenshots](#screenshots) -->
  * [Technologies](#technologies)
  * [License](#license)
  * [Credits](#credits)
  * [Questions](#questions)
  
  ## User Story
  ```md
  AS A parent
  I WANT to go to a website to browse qualified nannies to babysit my children
  I WANT to be able to learn about a nanny's qualifications, learn about the person, know their hourly-rate, years of experience in child care and education level.
  I WANT to be able to sign up 
  SO THAT I can contact a nanny of my preference 
  SO THAT I may potential hire a nanny for my children
  
  AS A nanny
 I WANT to provide potential parents the information that would make me the best candidate to nanny their children
 I WANT potential employers to contact me and learn about them and their children
 SO THAT I may learn more about them and their children before deciding to nanny their children
  ```
## Deployment
[Link to deployed app](https://nanny-poppins.herokuapp.com/)

## Technologies
A RESTful API was created using Node.js and Express
Handlebars.js were used to create our webpage templates
AWS-SDK and the Multer package were used for users to be able to upload and update their profile photo
bcrypt was used to hash user passwords
Sequelize ORM was used to create and implement our database (dotenv package was used to securely store our variables)

## Features
Parent users are able to leave a review and a star rating for their nanny
Parents are able to message their nanny's by sending a message, nannys are able to respond, as well
Users are able to upload and update their profile photos and have them stored on the AWS S3 server

## Credits
The contributors to this app include:
-[Janet Iqal](www.github.com/janetiqal)
-[Karla Goo](www.github.com/karlagoo)
-[Ricky Ramos](www.github.com/rickyramos)
-[Stephany Alcaide](www.github.com/stephanyalcaide)

## Questions
Please reach out to any one of the users above, or visit our organization at https://github.com/p2t4-require-espresso
