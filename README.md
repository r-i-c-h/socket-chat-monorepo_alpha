# socket-chat-monorepo_alpha

Combining a Socket.io server and a React client for a simple chat-room system

## TODO:

Make sure `.env` values are good to go on both netlify and heroku.
In Client.js change `process.env.BACKEND` address to point to heroku server.

## Bugs to Fix

No Bugs to report at the moment...

---

## Dev Notes

### Deployment Strategy:

Run react client-build manually via 'cd client && npm run build';

If need help monitoring socket-io server, maybe install https://github.com/drewblaisdell/monitor.io

## HEROKU FUN

### MULTI HEROKU DEPLOYMENT FROM A SINGLE MONOREPO:

Basically you manually push via the subtree command.

0. Make a `Procfile` build-file in the server directory with the build command: `web: node index.js`
1. Create both apps on Heroku:

- `heroku apps:create my-new-backend`

1. Include a buildpack for the create-react-app client [https://github.com/mars/create-react-app-buildpack]

   - `heroku apps:create my-new-reactapp --buildpack mars/create-react-app`
   - If you forgot you can `heroku buildpacks:set https://github.com/mars/create-react-app-buildpack` instead.

2. Add both as git remotes with `git remote add [remote name] [remote heroku git url]`

- `git remote add heroku-server https://git.heroku.com/my-new-backend`
- `git remote add heroku-client https://git.heroku.com/my-new-reactapp`

- OR `heroku git:remote -a my-new-reactapp` ?

3. Deploy individual folders to one or both of the heroku remotes like so:

- `git subtree push --prefix server heroku-server master`
- `git subtree push --prefix client heroku-client master`

So: `git subtree push --prefix server heroku-server master`

If you want to push from a different branch - `otherbranch:master`

https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack
aka https://github.com/mars/create-react-app-buildpack#usage

`heroku create my-new-app --remote name-for-remote-branch`
`heroku create -b https://github.com/mars/create-react-app-buildpack.git`
`heroku git:remote -a heroku-socketchat-client-alpha`

https://devcenter.heroku.com/articles/nodejs-support#only-installing-dependencies
