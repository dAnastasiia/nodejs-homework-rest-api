# Contacts API

## Overview

The public Contacts API, where you can create your own phonebook.

## Contacts

Contacts identified by their ids ads their owner id, which are unique integers, and live under `/api/contacts`.
All operations with contacts require token, which should be got after login.

All items have some of the following properties:

Field | Description | Type
----- | ----------- | ----
_id | The contact's unique id. | String
owner | The owner's unique id. | String
favorite | `true` if the contact added in favorite. | Boolean
name | Contact`s name. | String
email | Contact`s email. | String
phone | Contact`s phone. | String
createdAt | The time of contact`s creating. | String
updatedAt | The time of contact`s updating. | String

### Get contacts
Live under `/api/contacts`. GET operation.
Success response will consist of objects array with all user`s contacts. For example, 

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

Success response will consist of object with contact`s info. For example, 

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

Success response will consist of object with contact`s info with new changes. In our example there are "name" and "updatedAt" fields

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

Success response will consist of object with contact`s info with new changes. In our example there are "favorite" and "updatedAt" fields

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

Success response will consist of object with contact`s info and message "contact deleted". For example, 

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