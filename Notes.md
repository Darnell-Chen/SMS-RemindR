
# Dependencies
will need:
NodeJS

```npm install express cors mongodb nodemon```

***nodemon is used to run server after ctrl + s

or just "npm install" since it's all in package.json

[*]Notes from Meeting 1

Idea: Chore Web App

Things we spoke about: 
1) Need to express in the MERN acronym for our SMS messages and HTTP requests
2) We are looking for a 1x2 grid format for our welcome page, with (1,1)  = about page (1,2) = register page/button .  Alternatively, we have a 1x1 grid format that has BOTH register button and about info on same page
3) We will use UML diagram to display our Backend properly
4) backend will consist of node.js and MongoDB
-Talked about splitting the work using the webpages. Register Page may or may not require node.js .
[*]Notes from Meeting 2
-Flexible Layout, Utilize vars for colors, Prioritize code organization. Group css, js, frameworks, @ head elemtn in index.html
NOtes were about custom convention for creating the frontend.
-Also talked about the NoSQL database that we want to use. We are prioritizing the use of the JSON files/objects.
Also talked about connecting mongodb and node.js[task for Doc]
[*]Notes from Meeting 3
-Contemplating on whether to make application singular or multiple pages. Discussed
a few goals for week 3 which are written below
-Talked about beginning process of using express to host HTTP communcation between frontend and backend
-At this point, we have been working getting mongodb set up and working on getting 
the index.html page rolling.
-IMPT: Task that seems most difficult @ this point is parsing through POST data and reacting 
properly depending on user that is logged in.
## Week 1
*TASKS for Ardoine*

1) Need to connect mongodb and node.js. Need to work on how data will be formatted for database.  

<br>

*TASKS for Darnell*

1) Work on the beginning stages of frontend (index page / initial login page)

-a) 

## Week 2
create fetch requests for creating user accounts and use express js to accept and process the fetch requests
## Week 3
*TASKS for Ardoine*

1) Use Express to create the routing for HTTP communication between frontend and backend.

<br>

*TASKS for Darnell*
1) Work on the index.html page and begin working on writing code neccessary to implement dyanmic logins based on user credentials.


## Week 4

*Task for Ardoine*

1) Work on Registration using MongoDB's built-in createUser() function. Make sure to include properties such as the user's number and name. Return a status code of 200 or 500, depending on if the user is able to register or not. Also return a message of "success" or "fail".

2) Work on the Login function by Querying MongoDB to see if the user exists (using both the username and password to verify - check if mongodb already has a built in function for this). Return a JWT auth token if login is successful with status code 200. Return a 500 status code if login fails, with a message of either "success" or "fail".

## Week 4.5

*Task for Ardoine*

1) Work on adding family members on "/addMember" post Request to MongoDB. 

Notes:   Intitialize family size to 0 when user initially registers the account.

         Use ``req.user.email`` to get the email for querying MongoDB.
