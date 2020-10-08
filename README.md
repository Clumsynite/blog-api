# Blog API

## Introduction

Trying out REST Api

## Endpoints

ROUTE | METHOD | ENDPOINT | PURPOSE
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
*`/blog`*| **GET** | *`/all`* | Get All Blog Posts
*`/blog`*| **GET** | *`/:id/view`* | View a Blog Post
*`/blog`*| **POST** | *`/new`* | Create a new Post
*`/blog`*| **PUT** | *`/:id/update`* | Update a Blog Post
*`/blog`*| **DELETE** | *`/:id/delete`* | Delete a Blog Post
*`/blog`*| **POST** | *`/:id/comment/new`* | New Comment on a Post
*`/comment`*| **GET** | *`/:id/view`* | View a Comment
*`/comment`*| **PUT** | *`/:id/update`* | Edit a Comment
*`/comment`*| **DELETE** | *`/:id/delete`* | Delete a Comment
