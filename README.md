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
  - cloudinary
  - connect-flash
  - connect-mongo
  - dotenv
  - ejs
  - ejs-mate
  - express
  - express-mongo-sanitize
  - express-session
  - helmet
  - joi
  - method-override
  - mongoose
  - multer
  - multer-storage-cloudinary
  - passport
  - passport-local
  - passport-local-mongoose
  - postcss-cli
  - sanitize-html
  - @mapbox/mapbox-sdk

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
  - [x] List playgrounds with limit of eight per page
  - [x] List playgrounds' geo location in map by mapbox
    - [x] **Show Playground**
      - [x] show reviews
      - [x] add a review
      - [x] delete a review
    - [x] **Edit Playground**
      - [x] add multi images of a playground
      - [x] delet multi images of a playground
      - [x] edit title , description, location of a playground

- [x] **New Playground**
  - [x] add multi images of a playground
  - [x] add title, location and desciption of a playground

- [x] **Login**
  - [x] Login with username
  - [x] username, email and password validation

- [x] **Register**
  - [x] username
  - [x] email
  - [x] password
  - [x] confirm password
  - [x]  **Policy**
    - [x] show privacy policy

- [x] **Profile**
  - [x] upload user image
  - [x] eidt username
  - [x] eidt email

## Attribution

- Thanks [Colt Steele](https://github.com/Colt) for his design and [code](https://github.com/Colt/YelpCamp/tree/3ef5c4ca6aae9243b28167db3c3fb0665c3ea46a) guidance.
- Many of the illustrations have been taken from [heroicons](https://heroicons.com/) and [flaticon](https://www.flaticon.com/free-icon/playground_2334133).

## License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**