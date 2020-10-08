# Blog API

## Introduction

Trying out REST Api

## Endpoints

ROUTE | METHOD | ENDPOINT | Description
:------:|:--------:|:----------:|:------------:
*`/auth`*| **POST** | *`/login`* | User Login
*`/auth`*| **POST** | *`/logout`* | User Logout
*`/user`*| **POST** | *`/signup`* | User Signup
*`/user`*| **PUT** | *`/:id/update`* | Update User
*`/user`*| **GET** | *`/:id/view`* | View User
*`/user`*| **GET** | *`/me`* | View Your Profile
*`/user`*| **GET** | *`/:id/blogs`* | View Your Blogs
*`/user`*| **GET** | *`/drafts`* | View Your Drafts
*`/user`*| **GET** | *`/:id/comments`* | View Your Comments
