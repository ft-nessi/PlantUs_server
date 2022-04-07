# PlantUs

## Description

PlantUs & save the future
 
## User Stories

- **homepage** - As a user/ranger I want to be able to access the homepage to see what the app is about, to login and signup
- **sign up** - As a ranger I want to sign up so that I can start to mark the trees and see which trees were already planted. As a user I want to sign up so that I can see which trees should be planted, which trees I already planted and how much CO2 was absorbed by the trees that I planted.
- **login** - As a user/ranger I want to be able to login and access my profile (via email and password)
- **logout** - As a user I want to be able to log out from the webpage
- **profile page user** - As a user I want to see a short introduction of my Profile (Picture, little personal data, CO2 score and Motivation)
- **my overview user** - As a user I want to see a map with the locations where trees should be planted (neutral mark) and with the location of the trees that I planted (mark with an outstanding color). By clicking on a neutral location a window opens and you can see what kind of trees should be planted in the choosen location. You will also have a button to add the location to the planted tree list.
- **planted tree list user** - As a user I want to see a list of the planted trees. Each entry should have an edit button.
- **tree details user** - As a user I want to have a form which edits the entry of an planted tree. The form should have inputs (name, planted day, kind), a button, a little C02 score and a map with the exact location of the tree.
- **profile page ranger** - As a ranger I want to see a short introduction of my Profile (Picture, little personal data, CO2 score and Motivation)
- **overview page ranger** - As a ranger I want to see a map with the locations where the trees should be planted (neutral mark) and with the location of the trees that were planted (mark with an outstanding color).The locations are here not clickable.
- **marked trees ranger** - As a ranger I want to see a list with the marked locations (that I made or that already exist??) including the ones which were already planted by the user. The page should also have a "Add marked tree" button
- **new tree details ranger** - As a ranger I want to have a form which edits/adds a location where a tree should be planted. The form should have inputs (cooridnates, kind) and an edit /add button.
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault


## Backlog

List of other features outside of the MVPs scope

User profile:
- Upload option of profile picture

User myOverview page:
- filter option: planted trees/ trees to be planted / all trees

User myTrees page:
- Comment field between ranger and user

User myTree detail page:
- Little input with the CO2 score
- Map under form tag with only the mark of the selected tree

Ranger profile:
- Upload option of profile picture

Ranger myOverview page:
- filter option: planted trees/ trees to be planted / all trees

Ranger markedTrees page:
- Comment field between ranger and user
- If you press the delete button a message gets send to the user with the reason


## ROUTES:

React (http://localhost:3000):

- Layout (for every Path):
    - Should include our Logo
    - Should include signup and login button before authorization
    - Should include profile, overview and mytrees button after login of user
    - Should include profile, overview and markedtrees button after login of ranger

- Path "/" 
  - renders the homepage
  - svg germany map with marked locations
  - slogan
- Path "/signup" 
  - renders the signup form (dual registration)
  - user:input username, email, password, password, submit button
  - ranger:input username, email, password, password, submit button
  - axios post request to server
- Path "/login" 
  - renders the signup form (dual registration)
  - user:input email, password, submit button
  - ranger:input email, password, submit button
  - axios post request to server
- Path "/profile"
  - Profile details
  - map to show on profile page
  - axios request to server (to get map and profile details)

- Path "/profile/myTrees"
  - axios request to get list of trees
  - details of trees should be shown
  - edit button 

- Path "/profile/myTrees/:id"
  - axios post to send edited info of tree
  - details of trees should be shown
  - save button 

- Ranger: Path "/profile"
  - Profile details
  - map to show on profile page
  - axios request to server (to get map and profile details)

- Ranger: Path "/profile/markedTrees"
  - axios request to get list of trees
  - details of trees should be shown
  - add/delete/edit button 

- Ranger: Path "/profile/markedTrees/:id"
  - axios post to send edited info of tree
  - details of trees should be shown
  - save button 

- POST /logout                            
  - redirects to /login

Express (http://localhost:5005):

- POST ("/api/login")
    - authenticate and validate user (Find user, compare Password)
    - make session & send Cookie response 
- POST ("/api/signup")
    - register user (Is User unique?, Hash Password)
    - make session & send Cookie response 


## Models

User model

```
username: String
email: String
password: String
travels: [{Travel-Objects}]
adventures: [{Adventure-Objects}]
```

Travel model

```
owner: ObjectId<User>
country: String
cities: [String]
dateStart: Date
dateEnd: Date
``` 

Adventure model

```
owner: ObjectId<User>
country: String
cities: [String]
dateStart: Date
dateEnd: Date
``` 

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/Rowe32/Traventure)

[Deploy Link](https://iron-traventure.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1T9IYhwU33ETS8X4zt0RN7wKq8E6WmBiJw0pb-_CXfsw/edit#slide=id.g11a8856111b_0_102)
