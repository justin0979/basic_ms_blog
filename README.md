# Simple Blog using basic microservice style

This is the first basic project from Stephen Grider's [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/)

The client code is using a development configuration that I use instead of Create React App b/c it installs and get's up and running faster.

### REST Client in place of Postman

Postman is replaced with REST client (a VSC extention). This way, you do not have to install Postman.

Make any .http file (posts.http).

For example, posts.http

```sh
POST http://localhost:4000/posts
Content-Type: application/json

{
  title: "First Post"
}

###

GET http://localhost:4000/posts
```

Be sure to have the server running.

Directly above the `POST` and `GET` there will be a small link (`Send Request`) which you click on to post or get data.
