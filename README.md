# Simple Blog using basic microservice style

Known issues I've run into are towards the bottom of this file.
Also, production is not setup.

Kubernetes implementation is on `k8s` branch.<br />
Using docker-compose is on `docker-compose` branch; however,
docker-compose issues are listed below (these issues occured
on my arch linux desktop, have not tried another OS).

This is the first basic project from Stephen Grider's [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/)

The client code is using a [development configuration](https://github.com/justin0979/devconfig) that I use instead of Create React App b/c it installs and get's up and running faster.

## REST Client in place of Postman

Postman is replaced with REST client (a Visual Studio Code extension). This way, you do not have to install Postman.

Make any `.http file` (e.g. `posts.http`).

posts.http:

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

## k8s

### Start minikube

run <br/>
`minikube status`, if not running, then run<br />
`minikube start`

### enable ingress-nginx

enable ingress-nginx with <br />
`minikube addons enable ingress`

### Verify ingress installation

ensure nginx-ingress is running with<br />
`kubectl get pods -n kube-system`<br />
should see
`ingress-nginx-controller-<stuff>`

or, you can run<br />
`kubectl get pods -n kube-system -l app.kubernetes.io/name=ingress-nginx --watch`<br />
once verified, hit CNTL-c

## Styling is "custom"

Bootstrap is used in the lectures, but I opted to use the same class names but practice my 7-1 architecture and use of SASS by implementing my own styling.

# Issues

## Axios post undefined [Solved]

### Axios post undefined [Solution]

In webpack.dev.js, remove

```javascript
externals: {
  axios: {
    amd: "axios";
  }
}
```

and that is all.

### Failed attempts looking for axios post undefined cause [Solution above]

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

## UnhandledPromiseRejectionWarning for posting posts and comments [Unsolved]

Get `connect ECONNREFUSED 127.0.0.1:4005` from post submission and comment submission

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
  <li>upgrade in all Dockerfiles node:10-slim to 14</li>
  <li><p>added to each service:<br/>
      <code>
        networks: <br/>
       &nbsp - blog-net
      </code></p>
     <p> and added to the bottom of the .yml:</p>
      <code>
        networks:<br/>
        &nbsp - blog-net:
      </code>
      </li>
      <li>
        Add to ports in docker-compose.yml:<br/>
        <code>- "127.0.0.1:4005:4005"</code><br />
        to all of the services.
      </li>
</ul>

## [nodemon] app crash [Solved]

Event-bus' nodemon crashes when posts and comments are successfully created (not with docker, only worked from individual terminals).

event-bus terminal [nodemon] app crash solution

Fixed typos of `post` to `posts` and `post.comments.pusk` to `post.comments.push` and fixed incorrect `app.post('/post',...)` to `app.post('/events',...)`

## Event-bus server crashes when posting with query server down [Solved]

event-bus server crashes with `[nodemon] app crash ...`

### Event-bus crash [Solution]

Without below solution, event-bus server outputs `[nodemon] app crash...`<br/>
In `event-bus/index.js`:<br />

```javascript
app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/events", event); // posts
  axios.post("http://localhost:4001/events", event); // comments
  axios.post("http://localhost:4003/events", event); // moderation

  try {
    await axios.post("http://localhost:4002/events", event); // query
  } catch (e) {
    console.log("Query server on port 4002 is down.");
  }

  res.send({ status: "OK" });
});
```

## Kubernetes Issues

### ErrImagePull [Solved]

### ErrImagePull [Solution]

Pushed docker image to docker hub. It still took 11 minutes for the pod to get status of `running`. During that 11 minutes, the status read `ImagePullBackOff`.

Lecture "ErrImagePull, ErrImageNeverPull and ImagePullBackoff Errors" (Lecture 60 at this time) gives instructions on how to deal with this for local image pulls.

<ul>
  <li>add `imagePullPolicy: Never` gave:<br/>
  `The Pod "posts" is invalid: spec: Forbidden: pod updates...`</li>
</ul>

### Invalid Host Header after client-depl and ingress routes up [Solved]

### Invalid Host Header after client-depl and ingress routes up [Solution]

Added to `client/config/weback.dev.js`:

```javascript
devServer: {
  disableHostCheck: true,
  ...
}
```

### Nginx 503/502 [Solved]

### Nginx 503/502 [Solution]

Stopped all deployments with

```sh
kubectl delete --all deployments
```

and also, just to be safe (not sure if it was necessary):

```sh
kubectl delete --all services
```

then restarted all deployments in `infra/k8s/`:

```sh
kubectl apply -f .
```

### Cross-Origin Request Blocked [Solved]

### Cross-Origin Request Blocked [Solution]

Since I haven't set up package.json for production use with webpack, I added to `webpack.dev.js`:

```javascript
devServer: {
  ...,
  public: "http://posts.com:80",
}
```
