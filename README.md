# Demo Simple Web Application that allows you to search Flickr interestingness photos.

## Introduction

AngularJS based Flickr interestingness photos search web application. For demo purposes only!

## Requirements

In order to run the app correctly you need to have the following requirements in your machine:

  - __NodeJS & NPM__ - Normally installed with one package, via [their main website](http://nodejs.org)
  - __SASS__ - SASS compiler, please follow instructions at [their main website](http://sass-lang.com/install)
  - Demo Flickr Photos Search Web Service - can be cloned from [this repository]()

## The procedure

After cloning this repo (and exactly this branch), you should run:

```bash
npm install
```

This command will install the dependencies associated to the web service and testing process.

Then be sure that Demo Search Web Service is up and running. Please follow instructions from [the corresponding repository]()

When Search Web Service is up and running, you should exec:

```bash
npm start
```

This will compile main application style sass file and start app web server at port 3001.

After that, you just need to open the following address in your browser:

```
http://localhost:3001/
```

And it will load Search Web App.

## Suggested further web app improvements:
  - Separate main.js into several files (per module, controller, factory, directive)
  - Add tests
  - Use Grunt or Gulp build tasks
    - Linking, minification, etc (review Yeoman tasks)
  - Support React.js
  - Move searchApi url to some kind of config?
  - Downloaded images size (part of src parameter) should be responsive
  - Results pagination (e.g. more results load)
  - Searching... spinner?
