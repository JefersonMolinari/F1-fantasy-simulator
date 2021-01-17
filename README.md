# F1-fantasy-simulator


- [F1-fantasy-simulator](#F1-fantasy-simulator)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Progress](#progress)
    - [TODO](#todo)

## Getting started

- Make sure you have [nodejs](https://nodejs.org/en/) & [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) installed on your machine.
  
### Installation
1. In a terminal, clone this repository and navigate to project directory `cd F1-fantasy-simulator`. 
2. To install all necessary packages, simply run the utility file `node yarn-install.js`. This file will look for package.json files recursively and install the dependencies on each folder of the project where a package.json file is present.    
3. After that you should be ready to startup the project. Open two terminal instances at the project root level, then run:
  `cd server && yarn start` in one terminal instance to start the server at port `9000`.
  `cd client && yarn start` at the the other terminal instance to start the client at port `3000`. A new browser tab should be open automatically. 

### Progress:
- [x] Build MongoDB
  - [x] Populate database
- [x] Create Express.js Server
  - [x] Fetch data from MongoDB
- [x] Create Simple React.js App
  - [x] Built simple UI to display data table
  - [x] Connect to Express server to fetch data
- [ ] Design UX/UI
  - [ ] Project wireframe
  - [ ] High fidelity prototype
- [ ] Create New UI

### TODO
- [ ] Document project structure.  

  
 

<!-- A description
You need to make it very easy for someone who has 60 seconds to understand what the hell this is about and why that makes you a good programmer.

Make sure you answer at least the following questions:

What does it do? Write a short sentence and list the working functionalities.

What is it? Clearly, indicate what that code is supposed to produce. Is it a web, desktop, mobile app or a library?

What technologies are used? List all the important framework and libraries that contribute to this project. It's useful for a recruiter who is not necessarily familiar with every single framework on earth to know if this is Laravel and Vue or React and Expressjs.

What is the ambition of the project? Are you just test-driving a technology or is it something that is or will go live somewhere?

What is the stage of the project? Clearly, indicate where you are with it. Whether it is complete or a work in progress? If it's a work in progress indicate what is done and what is pending.

Are there some known issues or things that are not properly done? If yes list them because I'll be much more tolerant when/if I find shortcomings that have been highlighted than if I just discover them myself.

Tell me what to look at
If you're insisting on showcasing a large project there is a probably a lot of boilerplate or "plumbing" that is absolutely uninteresting so do not hesitate to indicate where are the juiciest bits.

If it's a fork in which you're contributing, make clear what you've been working on and if it's too hard to pinpoint then don't showcase that project.

How to run it
You should absolutely have a clear and precise explanation of how to run it (or how to use it if it is a library).

Running a demo version of your project must one-liner activity such as npm run, graddle serve, docker run .. or whatever is used by your framework.

There's very little reason in this day and age to have a long list of manual dependencies and pre-setup to run anything.

This is what you should strive for:

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# regenerate Element component styles in theme/ from element-variables.css
npm run theme
A demo
If you can have a live accessible demo link it directly in the description. If you can not have a live demo use a screen recorder; and if that's too much to ask; have at least a few screenshots.

https://asciinema.org/ seems cool for console recording but I have not tried it.

Unit test
Welcome to 2018, if your project doesn't have unit tests you should hide it. It's a bad reference and it reflects poorly on you. No excuses.-->
