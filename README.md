![Lines of code](https://img.shields.io/tokei/lines/github/catzzz/PlaygroundsApp)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/catzzz/PlaygroundsApp)

![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
# Bee's Playgrounds

A `Bee's playgrounds` theme for collecting playgrounds that user've been. The playgrounds will show geo location, add and edit pictures, reviews and rating of the playground.


## Features

- Minimalist Design
- Fully Responsive
- Full Stack Javascript
- Carefully Designed Cards
- Short Codes
- Show Geo Location in Map
- Tailwind CSS

## Screenshots


##### Home Page Sections

![Home Page Sections](https://github.com/catzzz/PlaygroundsApp/blob/main/screenshots/home.png)

##### List Playgrounds

![List Page](https://github.com/catzzz/PlaygroundsApp/blob/main/screenshots/playgrounds.png)

##### Responsive Playgrounds

<p align="center">
  <img src="https://github.com/catzzz/PlaygroundsApp/blob/main/screenshots/responsive.png" />
</p>

##### Show Playground

![Reading Page](https://github.com/catzzz/PlaygroundsApp/blob/main/screenshots/showPlaygrounds.png)


##### Post new Playgrounds

![Reading Page](https://github.com/catzzz/PlaygroundsApp/blob/main/screenshots/NewPlayground.png)

<!-- GETTING STARTED -->
## Getting Started

## Prerequisites

* npm

  ```sh
  npm install npm@latest -g
  ```

  #### packages 📦
  - [cloudinary](https://www.npmjs.com/package/cloudinary)
  - [connect-flash](https://www.npmjs.com/package/connect-flash)
  - [connect-mongo](https://www.npmjs.com/package/connect-mongo)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [ejs](https://www.npmjs.com/package/ejs)
  - [ejs-mate](https://www.npmjs.com/package/ejs-mate)
  - [express](https://www.npmjs.com/package/express)
  - [express-mongo-sanitize](express-mongo-sanitize)
  - [express-session](https://www.npmjs.com/package/express-session)
  - [helmet](https://www.npmjs.com/package/helmet)
  - [joi](https://www.npmjs.com/package/joi)
  - [method-override](https://www.npmjs.com/package/method-override)
  - [mongoose](https://www.npmjs.com/package/mongoose)
  - [multer](https://www.npmjs.com/package/multer)
  - [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)
  - [passport](https://www.npmjs.com/package/passport)
  - [passport-local](https://www.npmjs.com/package/passport-local)
  - [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)
  - [postcss-cli](https://www.npmjs.com/package/postcss-cli)
  - [sanitize-html](https://www.npmjs.com/package/sanitize-html)
  - [@mapbox/mapbox-sdk](https://www.npmjs.com/package/@mapbox/mapbox-sdk)

## Installation & Requirements 

1. Clone the repo
   ```sh
   git clone https://github.com/catzzz/PlaygroundsApp.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. create [CLOUDINARY](https://cloudinary.com/) API key in `.env`
   ```sh
    CLOUDINARY_CLOUD_NAME=`YOUR CLOUDINARY NAME`
    CLOUDINARY_KEY=`YOUR CLOUDINARY KEY`
    CLOUDINARY_SECRET=`YOUR CLOUDINARY SECRET`.
   ```

4. create [MAPBOX](https://www.mapbox.com/) API key in `.evn`
   ```sh
    MAPBOX_TOKEN=`YOUR MAPBOX TOKEN`
   ```  

5. create [MONGOALTAS](https://www.mongodb.com/cloud/atlas) url in `.env`

   ```sh
    DB_URL=`YOUR MONGODB URL`
   ```



## Project Roadmap

- [x] **Home**
  - [x] view **Playgrounds**

- [x] **Playgrounds**
  - [x] List playgrounds
  - [x] List playgrounds' Geo location in map by mapbox
  - [x] Pagenation
    - [x] **Show Playground**
      - [x] Show reviews
      - [x] Add a review
      - [x] Delete a review
    - [x] **Edit Playground**
      - [x] Add multi images of a playground
      - [x] Delet multi images of a playground
      - [x] Edit title , description, location of a playground

- [x] **New Playground**
  - [x] Add multiple images of a playground
  - [x] Add a title, a location and a desciption of a playground

- [x] **Login**
  - [x] Login with username
  - [x] Username, email and password validation

- [x] **Register**
  - [x] Username
  - [x] Email
  - [x] Password
  - [x] Confirm password
  - [x] Username, email, password and confirmed password validation
  - [x]  **Policy**
    - [x] Show privacy policy

- [x] **Profile**
  - [x] upload user image
  - [x] Edit username
  - [x] Edit email

## Attribution

- Thanks [Colt Steele](https://github.com/Colt) for his design and [code](https://github.com/Colt/YelpCamp/tree/3ef5c4ca6aae9243b28167db3c3fb0665c3ea46a) guidance.
- Many of the illustrations have been taken from [heroicons](https://heroicons.com/) and [flaticon](https://www.flaticon.com/free-icon/playground_2334133).

## License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**