# Simple Blog using basic microservice style

This is the first basic project from Stephen Grider's [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/)

The client code is using a [development configuration](https://github.com/justin0979/devconfig) that I use instead of Create React App b/c it installs and get's up and running faster.

## REST Client in place of Postman

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

## Styling is "custom"

Bootstrap is used in the lectures, but I opted to use the same class names but practice my scss by implementing my own styling.

# Issues

## Axios post undefined [Solved]

### Axios post undefined solution

In webpack.dev.js, remove

```javascript
externals: {
  axios: {
    amd: "axios";
  }
}
```

and that is all.

## Failed attempts looking for axios post undefined cause

After starting the client and attempting to submit a post by clicking the "Submit" button, get TypeError:

```sh
Uncaught (in promise)
TypeError: Cannot read property 'post' of undefined
    at _callee$ (PostCreate.jsx:37)
    at tryCatch (runtime.js:45)
    ...
```

Adding `console.log(title)` before `await axios.post()` outputs the title content, after the `axoios.post()`, no output due to TypeError.

So far, have tried the following:

<ul>
<li>Added <code>network_mode: host</code> to docker-compose.yml services and received
<br />
<code>
ERROR: for blog_client_1 Cannot start service client:  network brigder not found
</code>
</li>

<li>changed `devServer.host: "0.0.0.0"</li>
<li>installed @babel/plugin-transform-async-to-generator and updated babel.config.js</li>
<li>installed @babel/plugin-proposals-proposal-async-generator-functions and updated babel.config.js alone and with above plugin</li>
<li>installed babel-polyfill and @babel/plugin-transform-async-to-generator and updated babel.config.js</li>
<li>installed $babel/polyfill and @babel/plugin-transform-async-to-generator and updated babel.config.js</li>
<li>added<code>
devServer: proxy: { "/posts": "http://localhost:4000"}</code> and <code>
devServer: proxy: { "/posts": "http://0.0.0.0:4000"}
</code></li>
</ul>

## UnhandledPromiseRejectionWarning for posting posts and comments

Get `connect ECONNREFUSED 127.0..1:4005` from post submission and comment submission

Event-bus' nodemon crashes when posts and comments are successfully created (not with docker, only worked from individual terminals).

<ul>
  <li>Add <code>network_mode: host</code> to each service in docker-compose.yml and each service shows:<br/>
  <code>
    ERROR: for client "host" network_mode is incompatible with port_bindings<br />
    ERROR: for posts "host" network_mode is incompatible with port_bindings<br />
    ...
  </code>
  </li>
  <li>Tried updating version from <code>2.4</code> to <code>3</code>, same error as above</li>
  <li>
    Removed <code>network_mode: host</code> and removed async/await from event-bus index.js, still got first list item's above error.
  </li>
</ul>
