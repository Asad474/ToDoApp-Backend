# Backend Setup


## Getting Started


### 1. Install package dependencies

In the `root` directory, run:

```bash
$ npm install
```


### 2. Adding environment variables to .env file
```bash
NODE_ENV='development(if running locally)'
MONGODB_URI='Your MongoDB localhost or cluster url.'
PORT='Any Port No(eg: 8080, 8050 etc)'
ACCESSTOKEN_SECRET='secret should be a long, random string of characters. Longer secrets are generally more secure than shorter ones.'
REFRESHTOKEN_SECRET='secret should be a long, random string of characters. Longer secrets are generally more secure than shorter ones.'
```

You can create ACCESSTOKEN_SECRET and REFRESHTOKEN_SECRET by using following commands in node terminal:

```bash
$ require('crypto').randomBytes(64).toString('hex')
```

Make sure both secrets should be different.


### 3. Start Backend Server

To start backend server, run: 

```bash
$ npm run server
```


## API Routes

- `POST /api/login`: Used for user login.
- `POST /api/register`: Used for user registration.
- `POST /api/refresh`: Used for refreshing access tokens.
- `DELETE /api/refresh`: Used for revoking refresh tokens.
- `GET /api/tasks`: Used to retrieve all tasks.
- `POST /api/tasks`: Used to create a new task.
- `GET /api/task/:id`: Used to retrieve a specific task by ID.
- `PUT /api/task/:id`: Used to update a specific task by ID.
- `DELETE /api/task/:id`: Used to delete a specific task by ID.
