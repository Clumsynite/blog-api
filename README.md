# Blog API

## Introduction

You can call the API `https://clumsy-blog.herokuapp.com/ROUTE/ENDPOINT`, this way
> For Example: `https://clumsy-blog.herokuapp.com/blog/all`

You can view the endpoints [below](#endpoints)

Logging in before calling other endpoints is necessary. Calling `/auth/login` with `username and password` will authenticate the user, create a session and generate a *JsonWebToken* for the API to verify on each call.

Therfore, Calling any other endpoint before authenticating will result in an error.  


Furthermore, there are restrictiions placed in Update and Delete calls. For instance, You need to be author of a Blog post or comment in order to edit or delete it, it'll return an error otherwise.

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

## Tips

* Calling all blogs will only return blogs, to access comment you'll have to view each blog by calling `https://clumsy-blog.herokuapp.com/blog/:id/view`. This'll return the blog post with all its comments.
* The user can edit or delete only posts/comments which they created.
* If you delete a blog post, every comment inside it will be removed
* To view your blog posts and comments you can call `https://clumsy-blog.herokuapp.com/user/me`. This'll return an object like this:

  ```js
  {
    user: {
      _id: Schema.Type.ObjectId,
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      added: Date()
    },
    blogs: [
      {
        _id: Schema.Type.ObjectId,
        author: Schema.Type.ObjectId,
        title: "Title Text",
        content: "Blog Content",
        added: Date()
      },
      ...
    ],
    comments: [
      {
        _id: Schema.Type.ObjectId,
        author: Schema.Type.ObjectId,
        blog: Schema.Type.ObjectId,
        title: "Comment Title",
        content: "Comment Content",
        added: Date()
      },
      ...
    ]
  }
  ```

* When you logout, your session and JsonWebToken are destroyed. So, until the user logs in again, none of the API endpoints other than `/auth` will work.
* Success Messages are returned for Logout and Delete calls which can be accessed by `result.message`, result being the fetch call.
* Error messages are returned for errors, which can be accessed by `result.error`, result being the fetch call.