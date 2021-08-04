# Contacts API

## Overview

The public Contacts API, where you can create your own phonebook.

## Users

Users identified by their ids, which are unique integers, and live under `/api/users`.

All items have some of the following properties:

Field | Description | Type
----- | ----------- | ----
email | User`s email. | String
subscription | User`s subscription. Default value "starter". | String
avatarURL | Link to the user`s avatar. Default image from gravatar. | String
token | User`s token for current session. | String

### Signup
Live under `/api/users/signup`. PUT operation.

This operation requires **request body** with required fields "password" and "email". For example, 

```javascript
{
    "password": "123456789",
    "email": "rinal85076@insgogc.com"
}
```

Success response will contain object with user`s info. For example, 

```javascript
{
    "status": "success",
    "code": 201,
    "user": {
        "email": "rinal85076@insgogc.com",
        "subscription": "starter",
        "avatarURL": "https://s.gravatar.com/avatar/dde597e7f35c6c8127c5cc2e6fa2173d?s=250"
    }
}
```

After that you receive a letter on email. You need confirm your account for successful login. 

Confirmation on this project stage live under `http://localhost:3000/api/users/verify/<id>`.

Success response will contain next object: 

```javascript
{
    "status": "success",
    "code": 200,
    "message": "Verification successful"
}
```

### Verification
Live under `/api/users/verify`. PUT operation.

You need this operation in case if you don`t receive a verification letter.

This operation requires **request body** with required field "email". For example, 

```javascript
{
    "email": "rinal85076@insgogc.com"
}
```

Success response will contain object with message "Verification email sent":

```javascript
{
    "status": "success",
    "code": 200,
    "message": "Verification email sent"
}
```

### Login
Live under `/api/users/login. PUT operation.

This operation requires **request body** with required fields "password" and "email". For example, 

```javascript
{
    "password": "123456789",
    "email": "rinal85076@insgogc.com"
}
```

Success response will contain object with user`s info and token. For example, 

```javascript
{
    "status": "success",
    "code": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGFiNmUyYWQyMDViM2MwNGFmYTZjYSIsImlhdCI6MTYyODA5MzQ3OSwiZXhwIjoxNjI4MTAwNjc5fQ.hX2sjUtNm4_qVJiMJlckLXZ2jdrqGhgY2lChWji7s40",
    "user": {
        "email": "rinal85076@insgogc.com",
        "subscription": "starter"
    }
}
```

### Current user
Live under `/api/users/current`. GET operation.

This operation require token, which should be got after login.

Success response will contain object with user`s info:

```javascript
{
    "status": "success",
    "code": 200,
    "user": {
        "email": "rinal85076@insgogc.com",
        "subscription": "starter"
    }
}
```

### Update avatar
Live under `/api/users/avatars`. PATCH operation.

This operation require token, which should be got after login.

This operation requires **request body** form-data type with a key-value pair, where the key is "avatar" and the value is the file that we select on our device.

Success response will contain object with new avatar link. For example, 

```javascript
{
    "status": "success",
    "code": 200,
    "user": {
        "avatarURL": "http://localhost:3000/avatars/610ab6e2ad205b3c04afa6ca//image-name.jpg"
    }
}
```

### Logout
Live under `/api/users/logout`. PUT operation.

This operation require token, which should be got after login.

Success response is just 204 status.

## Contacts

Contacts identified by their ids and their owner id, which are unique integers, and live under `/api/contacts`.
All operations with contacts require token, which should be got after login.

All items have some of the following properties:

Field | Description | Type
----- | ----------- | ----
_id | The contact's unique id. | String
owner | The owner's unique id. | String
favorite | `true` if the contact added in favorite. Default value "false". | Boolean
name | Contact`s name. | String
email | Contact`s email. | String
phone | Contact`s phone. | String
createdAt | The time of contact`s creating. | String
updatedAt | The time of contact`s updating. | String

### Get contacts
Live under `/api/contacts`. GET operation.

Success response will contain objects array with all user`s contacts. For example, 

```javascript
{
  "status": "success",
  "code": 200,
  "contacts": [
    {
      "favorite": false,
      "_id": "610aa33ead205b3c04afa6c7",
      "owner": "60d468ab1f720e63583dce65",
      "name": "Ronald",
      "email": "ronny@mail.com",
      "phone": "(000) 000-000",
      "createdAt": "2021-08-04T14:25:02.441Z",
      "updatedAt": "2021-08-04T14:25:02.441Z"
    },
    {
      "favorite": true,
      "_id": "610aa65ead205b3c04afa6c8",
      "owner": "60d468ab1f720e63583dce65",
      "name": "Polly",
      "email": "polly@mail.com",
      "phone": "(111) 111-111",
      "createdAt": "2021-08-04T14:38:22.494Z",
      "updatedAt": "2021-08-04T14:38:22.494Z"
    }
  ]
}
```

### Add new contact
Live under `/api/contacts`. POST operation.

This operation requires **request body** with required fields "name", "email" and "phone". For example, 

```javascript
{
  "name": "Polly",
  "email": "polly@mail.com",
  "phone": "(111) 111-111"
}
```

Success response will contain object with contact`s info. For example, 

```javascript
{
  "status": "success",
  "code": 200,
  "contact": {
    "favorite": false,
    "_id": "610aa65ead205b3c04afa6c8",
    "owner": "60d468ab1f720e63583dce65",
    "name": "Polly",
    "email": "polly@mail.com",
    "phone": "(111) 111-111",
    "createdAt": "2021-08-04T14:38:22.494Z",
    "updatedAt": "2021-08-04T14:38:22.494Z"
  }
}
```

### Get contact by id
Live under `/api/contacts/<id>`. GET operation.

Success response equal success response for __Add new contact operation__.

### Update contact by id
Live under `/api/contacts/<id>`. PUT operation.

This operation requires **request body** with one of the fields "name", "email" and "phone". For example, 

```javascript
{
  "name": "Polly2",
}
```

Success response will contain object with contact`s info with new changes. In our example there are "name" and "updatedAt" fields

```javascript
{
  "status": "success",
  "code": 200,
  "contact": {
    "favorite": false,
    "_id": "610aa65ead205b3c04afa6c8",
    "owner": "60d468ab1f720e63583dce65",
    "name": "Polly2",
    "email": "polly@mail.com",
    "phone": "(111) 111-111",
    "createdAt": "2021-08-04T14:38:22.494Z",
    "updatedAt": "2021-08-04T15:11:23.337Z"
  }
}
```

### Update contact status by id
Live under `/api/contacts/<id>/favorite`. PATCH operation.

This operation requires **request body** with required field "favorite". For example, 

```javascript
{
  "favorite": true,
}
```

Success response will contain object with contact`s info with new changes. In our example there are "favorite" and "updatedAt" fields

```javascript
{
  "status": "success",
  "code": 200,
  "contact": {
    "favorite": true,
    "_id": "610aa65ead205b3c04afa6c8",
    "owner": "60d468ab1f720e63583dce65",
    "name": "Polly2",
    "email": "polly@mail.com",
    "phone": "(111) 111-111",
    "createdAt": "2021-08-04T14:38:22.494Z",
    "updatedAt": "2021-08-04T15:14:54.427Z"
  }
}
```

### Delete contact by id
Live under `/api/contacts/<id>`. DELETE operation.

Success response will contain object with contact`s info and message "contact deleted". For example, 

```javascript
{
  "status": "success",
  "code": 200,
  "message": "contact deleted",
  "contact": {
      "favorite": true,
      "_id": "610aa65ead205b3c04afa6c8",
      "owner": "60d468ab1f720e63583dce65",
      "name": "Polly2",
      "email": "polly@mail.com",
      "phone": "(111) 111-111",
      "createdAt": "2021-08-04T14:38:22.494Z",
      "updatedAt": "2021-08-04T15:14:54.427Z"
  }
}
```