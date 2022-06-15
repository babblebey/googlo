# Googlo
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/babblebey" target="_blank">
    <img alt="Twitter: babblebey" src="https://img.shields.io/twitter/follow/babblebey.svg?style=social" />
  </a>
</p>

> A ReactJS Realistic Google Clone App with Voice Search Feature

### ✨ [Live Preview](https://googlo-bey.netlify.app/)

## Install
Run the Command to Install all dependencies.
```sh
npm install
```

## Usage

Create API Credentials/Keys from the following Providers

* [Google Search (apigeek - Rapid API)](https://rapidapi.com/apigeek/api/google-search3/)
* [Google Web Search (Glavier - Rapid API)](https://rapidapi.com/Glavier/api/google-web-search/)

Setup App ID for Voice Search Feature via [Speechly](https://www.speechly.com/)

* Create/Log-in to the Speechly Dashboard
* Create a new application and select the “Empty” template
* Click “Deploy” and wait for the deployment to finish (the status indicator turns green)
* Grab the App ID from the header

Create a `.env` file in your root directory, create the variables as seen below filling in your API Key & App ID appropriately
```sh
VITE_GOOGLE_SEARCH_APIKEY=RAPIDAPI-APIKEY-HERE
VITE_SPEECHLY_APP_ID=SPEECHLY-APP-ID-HERE
```

Now run the command to start the development server.
```sh
npm run dev
```
Your project should start running on `http://localhost:3000`

## Author

👤 **Olabode Lawal-Shittabey**

* Twitter: [@babblebey](https://twitter.com/babblebey)
* LinkedIn: [@babblebey](https://linkedin.com/in/babblebey)
* Instagram: [@babblebey](https://instagram.com/babblebey)

## Show your support

Give a ⭐️ if this project helped you!
