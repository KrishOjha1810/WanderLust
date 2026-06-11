# WanderLust

An Airbnb style stay listing platform where travelers can publish, discover, review, and map out places to stay.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

## Overview

WanderLust is a full stack, server rendered web application for managing stay
listings. Registered users can create listings with photos and a location,
browse listings published by others, leave star ratings and written reviews,
and see each listing pinned on an interactive map. The app follows an MVC
structure on top of Node and Express, persists data in MongoDB through Mongoose,
renders pages with EJS, stores uploaded images on Cloudinary, and geocodes
locations with Mapbox. Authentication, sessions, ownership checks, and flash
messaging are wired in so that only the right users can edit or delete the
content they own.

## Features

- **Listings CRUD**: create, read, update, and delete stay listings, each with a
  title, description, price, location, and country.
- **Authentication**: local username and password signup, login, and logout
  backed by Passport and passport-local-mongoose (salted and hashed credentials).
- **Authorization**: ownership middleware restricts editing and deleting a
  listing to its owner, and review deletion to the review author.
- **Reviews**: logged in users can post star ratings (1 to 5) with a comment on a
  listing, and authors can delete their own reviews. Deleting a listing cascades
  to remove its reviews.
- **Image uploads via Cloudinary**: listing photos are uploaded through Multer and
  stored on Cloudinary, with the returned secure URLs saved on the listing.
- **Maps via Mapbox**: listing locations are forward geocoded with the Mapbox SDK
  and rendered as an interactive map with a marker on each listing page.
- **Flash messages**: success and error notifications are surfaced to the user
  across redirects using connect-flash.
- **Sessions**: server side sessions are stored in MongoDB via connect-mongo,
  with HTTP only cookies and a seven day expiry.
- **Server side validation**: incoming listing and review payloads are validated
  with Joi before they reach the database.
- **View counter**: each listing tracks how many times its page has been viewed.

## Tech stack

- **Runtime and server**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Views**: EJS with ejs-mate layouts
- **Authentication**: Passport, passport-local, passport-local-mongoose
- **Sessions and flash**: express-session, connect-mongo, connect-flash, cookie-parser
- **File uploads**: Multer, multer-storage-cloudinary, Cloudinary
- **Maps and geocoding**: Mapbox SDK (@mapbox/mapbox-sdk)
- **Validation**: Joi
- **Utilities**: method-override, dotenv

## Project structure

```
WanderLust/
├── app.js               # App entry point, middleware, and route mounting
├── middleware.js        # Auth, ownership, and validation middleware
├── schema.js            # Joi validation schemas for listings and reviews
├── cloudConfig.js       # Cloudinary and Multer storage configuration
├── models/              # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── controllers/         # Route handler logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── routes/              # Express routers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates (listings, users, layouts, includes)
├── public/              # Static assets (css and client side js, including map.js)
└── utils/               # wrapAsync and ExpressError helpers
```

## Getting started

### Prerequisites

- Node.js and npm installed
- A running MongoDB instance (the app reads its connection string from an
  environment variable and also uses it as the session store)
- Cloudinary and Mapbox accounts for image hosting and geocoding

### Install

```bash
git clone <repository-url>
cd WanderLust
npm install
```

### Configure

Create a `.env` file in the project root and set the environment variables listed
below. In non production environments the app loads this file automatically via
dotenv.

### Run

```bash
node app.js
```

The server starts on port 8080. Open `http://localhost:8080/listings` in your
browser.

## Environment variables

The application reads the following keys from the environment:

| Variable | Purpose |
| --- | --- |
| `ATLASDB_URL` | MongoDB connection string (used for both data and the session store) |
| `SECRET` | Secret used to sign sessions and encrypt the session store |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Mapbox access token for geocoding and map rendering |

## Screenshots

<!-- Add screenshots here -->

## Author

Krish Ojha
