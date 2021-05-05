# Red Vinyl

### This app is designed for any and all muic lovers. Whether you're looking for your favorite song lyrics, or creating a list of concerts that you'd like to go to, we've got you covered!

## Created by Game of Threads:

- John -- github.com/jflood215
- Octavia -- github.com/occlairmont
- Kayla -- github.com/kjobe92

## App Features

### Users:

    - Create a personalized user account
    - Search for songs by artist and get lyrics
    - Save your favorite songs and give them a rating and comment
    - Display all favorited songs
    - Track all concerts you've attended in the past or want to see in the future
    - Ability to edit and/or delete concerts and favorite songs

### Admins:

    - Display all concert events that users have created

## App Endpoints

### Users: ~/users

        POST /create        => Registers new user account
        POST /login         => Logs in a user

### Admin: ~/admin

        POST/login        => Logs in an admin
        GET/              => Gets all concert and event info

### Music: ~/music

        POST /create		=> Creates a new song post.
        GET /all			=> Retrieves all song posts
        PUT /update/:id		=> Updates a song post
        DELETE /delete/:id	=> Deletes a song

### Events: ~/events

        POST /create		=> Logs a concert event
        GET /all			=> Retrieves all concert events
        GET /search-dates	=> Searches concerts upcoming and past
        DELETE /delete/:id	=> Deletes a concert event

## Take a look at Red Vinyl

### Login/Signup

![Login:Signup](https://imgur.com/XHQZVCi.png)

### Music API Fetch

![Music](https://imgur.com/ElGN59Z.png)

### Music Review

![Music Review](https://imgur.com/SebixcU.png)

### Events

![Events](https://imgur.com/wtm24uY.png)

### Admin

![Admin]()

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
