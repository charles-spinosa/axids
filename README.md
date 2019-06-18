# Axiad IDS challenge

Challenge

The application should expose RESTful APIs, the API should allow the following functionality:

- CRUD services for jobs, each job describing the URL to scrape and results of the job. The application should be able to handle multiple URLs that need to be scraped.
- Trigger a new scrape
- Identify whether a scrape is complete or in progress
- Retrieve the largest image for any given scraped URL (to be selected by the caller of the API)
- It should leverage a database (whichever you are most familiar with).

- It should be able to scrape http & https URLs.

The frontend should be a single page application with the following:

- a list of URL scrapes (both in progress and complete)
  clicking one scrape should display details of the scrape:
- URL
- start date time
- status
- largest image regardless of whether in progress or complete
- text field to submit a new URL scrape and the new URL scrape should appear in the in progress list

# Design Decisions

### Database

- MongoDB:
  Used to store jobs
- Redis:
  Used to implement a Job queue

### Server

- HTML Server (express):
  Used to respond to RESTful requests, establish web socket connections, and serve static files. Adds incoming jobs to DB, and places existing jobs into Redis jobs queue

- Jobs Server (express):
  Pulls jobs off of Redis jobs queue, updates MongoDB as jobs are processed

### Client

- React:
  Displays status of jobs to user, provides interface to submit jobs and begin processing of jobs
