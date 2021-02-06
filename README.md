# Break down of React Native Application

## Tools

- React Navigation to add screen swipe functionality and overall ability to go to other screens
- Redux for state management of the Crypto Tracker App
- React Native Elements to implement other ui features
- Firebase to help handle user authentication

## App folder

- Consists of the firebase.js file which initializes the project for firebase use which allowed me to set up the user authentication
- Also consists of the store.js file which contains the configuration for the redux store

## App.js

- Consist of the main setup
- Which includes the setup for the navigation and the provider so that I can set up the navigation between the screens and so that the screens have access to Redux store

## Components

- Created a trackedList component which manages the UI for the display of each currency on the home page

## Redux

- Implemented redux with redux toolkit
- Create a trackedCryptoSlice to manage the tracked currencies in the store

## Screens

- ### Login Screen

  - First Screen that is loaded when the app is opened
  - Consists of two input fields: one for email input and the other for password input
  - Consists of two buttons: one for signing in and the other for navigating to the register page if user has no account

- ### Register Screen

  - This page allows a user to create an account
  - Consists of three input fields and a Register Account Button
  - The input fields are for the users email, password, and a photo url(for users profile picture)
  - The Register Account Button will check if account is available and if it is, the user will be signed in and redirected to the Home Page

- ### Home Screen

  - This is where the tracked currencies will be displayed
  - If none are tracked, it will display a message saying you can click link below to add a currency to track
  - If some are tracked, it will list out the currencies name, symbol, price, percentage and a button that allows a user to remove it from the tracked list
  - The link that says add cryptocurrency will navigate user to add Crypto page to add cryptocurrency to tracked list

- ### AddCrypto Screen
  - Displays a Title that says Crypto, a input and a add crypto button
  - the input allows a user to input a cryptocurrency symbol such as BTC, ETH, LTC, etc.
  - The button allows a user to add the currency when pressed. It first checks if its already tracked, but if its not then it will be added to the tracked list and user will be navigated back to home page
