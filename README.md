# CommunityConnector
A React App to keep Community Members Informed and Connected

Community Connector is a React App designed to keep Community Members involved, informed and connected.   

It includes 3 components - a Community Bulletin Board that lists all the open issues for the community and a place for each Community Member to be able to offer their feedback.  

## Contributors
* **Sumathi Ganjam** [github](https://github.com/ghSB17)
* **Efrat Rosmarin** [github](https://github.com/efratrosmarin)
* **Joyce Santos** [github](https://github.com/puppitty)

## Who this could be helpful for
This app is designed to help improve communications within communities. Possibilities include Home Owners Associations and small townships.

## Built With:

- axios,
- classnames,
- jwt-decode,
- moment,
- react, 
- react-dom, 
- react-draggable, 
- react-fa, 
- react-icons, 
- react-redux, 
- react-router-dom, 
- react-scripts, 
- redux, 
- redux-thunk, 
- bcryptjs, 
- body-parser, 
- dotenv, 
- express, 
- gravatar, 
- jsonwebtoken, 
- mongoose, 
- Mongo
- passport, 
- passport-jwt,
- New York times (API's)


### ERD
![Flowchart Image](./notes/JSJSWIM_DB.png)


### JSJ Swim School 
* Home Page
![Home page](./notes/Homepage.PNG)

* User Login
![Login](./notes/Login_Register.PNG)

* User Sign-in 
![Sign-up Page](./notes/Signup.PNG)

* Course Registration 
![Course Registration](./notes/Course_Registration.PNG)

* Registration Confirmation
![Registration Confirmation](./notes/Registered.PNG)

* Courses  
![Courses](./notes/Courses.png)

* Courses - Error 
![Courses Error](./notes/Error-AlreadySignedUp.PNG)

* Registered Email 
![Registered Email](./notes/RegisteredEmail.PNG)

* Class Confirmation Email 
![Class Confirmation Email](./notes/ClassSignUp.PNG)

### Admin

* Admin 
![Admin](./notes/admin.PNG)

* Class Descriptions 
![Admin - Class Descriptions](./notes/Class_Description.PNG)

* Class Instance 
![Admin - Class Instance](./notes/Class_Instance.PNG)

### Quick Start

To run a local / development copy:

1. Update the config.json file:
```json
{
  "development": {
    "username": YOUR_USERNAME,
    "password": YOUR_PASSWORD,
    "database": "jsjswim_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

2. Create a jsjswim_db database.