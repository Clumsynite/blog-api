# Blog API

## Introduction

This is the Backend for:

- Blog Read : [Live Page](https://clumsynite.github.io/blog-read/) **||** [Repository](https://github.com/clumsynite/blog-read)
- Blog Write : [Live Page](https://clumsynite.github.io/blog-write/) **||** [Repository](https://github.com/clumsynite/blog-write)

You can call the API `https://clumsy-blog.herokuapp.com/ROUTE/ENDPOINT`, this way

> For Example: `https://clumsy-blog.herokuapp.com/blog/all`

You can view the endpoints [here](#endpoints)

Logging in before calling other endpoints is **necessary**. Calling `/auth/login` with `username and password` will authenticate the user, create a session and generate a _JsonWebToken_ for the API to verify on each call.

Since, Calling any other endpoint before authenticating will result in an error.

Furthermore, there are restrictiions placed in Update and Delete calls. For instance, You need to be author of a Blog post or comment in order to edit or delete it, it'll return an error otherwise.

## Endpoints

|    ROUTE     |   METHOD   |       ENDPOINT       |        PURPOSE        |
| :----------: | :--------: | :------------------: | :-------------------: |
|  _`/auth`_   |  **POST**  |      _`/login`_      |      User Login       |
|  _`/auth`_   |  **POST**  |     _`/logout`_      |      User Logout      |
|  _`/user`_   |  **POST**  |     _`/signup`_      |      User Signup      |
|  _`/user`_   |  **PUT**   |   _`/:id/update`_    |      Update User      |
|  _`/user`_   |  **GET**   |    _`/:id/view`_     |       View User       |
|  _`/user`_   |  **GET**   |       _`/me`_        |   View Your Profile   |
|  _`/user`_   |  **GET**   |    _`/:id/blogs`_    |    View Your Blogs    |
|  _`/user`_   |  **GET**   |     _`/drafts`_      |   View Your Drafts    |
|  _`/user`_   |  **GET**   |  _`/:id/comments`_   |  View Your Comments   |
|  _`/blog`_   |  **GET**   |       _`/all`_       |  Get All Blog Posts   |
|  _`/blog`_   |  **GET**   |    _`/:id/view`_     |   View a Blog Post    |
|  _`/blog`_   |  **POST**  |       _`/new`_       |   Create a new Post   |
|  _`/blog`_   |  **PUT**   |   _`/:id/update`_    |  Update a Blog Post   |
|  _`/blog`_   | **DELETE** |   _`/:id/delete`_    |  Delete a Blog Post   |
|  _`/blog`_   |  **POST**  | _`/:id/comment/new`_ | New Comment on a Post |
| _`/comment`_ |  **GET**   |    _`/:id/view`_     |    View a Comment     |
| _`/comment`_ |  **PUT**   |   _`/:id/update`_    |    Edit a Comment     |
| _`/comment`_ | **DELETE** |   _`/:id/delete`_    |   Delete a Comment    |

## Tips

- Calling all blogs will only return the blogs, to access comments inside those blogs you'll have to view each blog by calling `https://clumsy-blog.herokuapp.com/blog/:id/view`. This'll return the blog post with all its comments.
- The user can only edit or delete posts or comments which **they** have created.
- If you delete a blog post, **every** comment inside it will be removed
- To view your blog posts and comments you can call `https://clumsy-blog.herokuapp.com/user/me`. This'll return an object which'll look like this:

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

- When you logout, your session and JsonWebToken are destroyed. So, until the user logs in again, none of the API endpoints other than `/auth` will work.
- Success Messages are returned for Logout and Delete calls which can be accessed by `result.message`, result being the fetch call.
- Error messages are returned for errors, which can be accessed by `result.error`, result being the fetch call.

## Packages Used For

- **bcryptjs** : _To hash passwords_
- **connect-mongo**: _To store session on mongodb_
- **cookie-parser**: _read cookie for token verification_
- **cors** - _to enable `cross-origin-resource-sharing`_
- **dotenv**: _To access environment variables_
- **express-session**: _To initiate and manage session on server_
- **jsonwebtoken** - _creates token for API to verify on each call_
- **marked** - _parse `README.md` as HTML_
- **moment**: _To parse timestamp_
- **mongoose**: _To access and modify mongodb_
- **nodemon**: _To restart server on save_
- **passport**: _To authenticate User_
- **passport-local**: _Access passport's Local Strategy_
- **pug**: _HTML template engine for javascript_
