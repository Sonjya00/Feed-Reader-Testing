# Feed Reader Testing Project

## Project Description

This is a project made for the completion of the [Udacity's Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001?v=fe1).

Detailed instructions for this project can be found on the [Project Rubric](https://review.udacity.com/#!/projects/3442558598/rubric)

## Overview

For this project, a web-based application that reads RSS feeds is provided. The objective of the project is to write a series of test suites using the framework [Jasmine](http://jasmine.github.io/) in order to analyze multiple aspects of the Feed Reader and to make sure that all its functionalities work as expected.

## Instructions

To start, download this project, unzip the folder, and open the file **index.html** on your preferred browser.

On the upper part of the page, the application's content will be displayed: under the top bar, there is a list of feed entries, each with a url that brings to another page. On the top left corner, there is a clickable menu with more links to visit.

On the bottom of the page, under the Jasmine title and logo, the **test results** and description are displayed, along with the total number of specs (in this project, there are 7), and the number of tests that have failed. If all tests are passed the upper bar will be green; if one or more have failed, the bar will be red. In case one or more test fail, an explanation is included below.

Under the stats, there is a list describing all of the tests performed. The tests are divided by "category", and it is possible to click on each of them to perform that single test alone.

All the tests written for this app are contained inside of the **feedreader.js** file, which is found on jasmine/spec.

## Tests description

**RSS Feeds**
- are defined;
- all have a URL defined and not empty;
- all have a name defined and not empty;

**The menu**
- should not be visible by default;
- changes visibility when the menu icon is clicked;

**Initial Entries**
- there is at least one entry when loadFeed is called and complete;

**New Feed Selection**
- when a new feed is loaded, the content changes;
