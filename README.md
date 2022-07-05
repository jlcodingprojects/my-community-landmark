# my-community-landmark
Community note taking web application create as technical challenge for My Community Directory.

[Try it in your browser!](https://jlcodingprojects.github.io/)

# Features
- Fully responsive
- Simple API calls to retrieve list of notes
- Extensive use of react hooks
- Managing state, session, and local data

# Compiling

First create default application
```
npx create-react-app my-community-landmark
```
Delete all files in the ./src directory and replace with src files from repository

Install required dependencies listed below

You're done!
```
npm start
```

# Roadmap
Unfortunately not all desired features were able to be implemented in time. Some awesome planned features include

- Serverside searching/filtering
- Correct authorisation implementation
- Grouping markers that are too close together and auto-zooming on them
- Displaying all notes for a single location in one dialog so you can switch between them
- Ability to delete and edit user owned notes


# Dependencies
- reactstrap
- bootstrap
- leaflet
- react-leaflet
- react-router-dom
- gh-pages [only required for deployment for github pages]


#API
A simple mock json API is used. It is hosted using [JSON Placeholder](https://jsonplaceholder.typicode.com/). Unfortunately this means POST data does not persist across calls. Therefore all submitted data is only stored locally for this example deployment.
