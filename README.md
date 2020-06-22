# socket-chat-monorepo_alpha

Combining a Socket.io server and a React client for a simple chat-room system

---

## TODO:

Nada atm.

---

## Bugs to Fix

No Bugs to report at the moment...

---

## Dev Notes

If necessary, to monitor socket-io server, maybe install https://github.com/drewblaisdell/monitor.io ?

---

## Deployment:

### CLIENT >>

Hosted and (re)-built on netlify based on a git-push to the github master branch.
The `netlify.toml` file in root dir specifies the following parameters :

- Base Directory: `client/`
- Read\Publish Directory: `build/`
  - the `client/` prefix is implied by the above apparently
- Build Command: `"npm run build && echo 'Default build is default building...'"`

⚠️ :warning: In `Client.js` the `process.env.REACT_APP_BACKEND` address has to point to the heroku server (`https://heroku-socketchat-server-alpha.herokuapp.com`). This value is controlled on the Netlify Web UI

### SERVER >>

(tl;dr)= **`git subtree push --prefix server heroku-server master`**

Basically you manually push via the `subtree` command.

- `--prefix server` = split out and push only the `server` directory
- `heroku-server` = the name of the git remote setup that points to git.heroku.com/....
- `master` = heroku will only look at the master branch.

---

### HEROKU MULTI APP DEPLOYMENT FROM A SINGLE MONOREPO:

Some notes here about using heroku for create-react-app deployment, but abandoned that in favor of using Netlify for the react deploy.

1. `Procfile` [build-file] in the server directory with the command: `web: node index.js`

2. Create app on Heroku:

- `heroku apps:create my-new-backend`
- `heroku create app-name --remote name-for-remote-branch` = `heroku create my-new-backend-app --remote heroku-server`

To Include a buildpack for the create-react-app client [https://github.com/mars/create-react-app-buildpack]

- `heroku apps:create my-new-reactapp --buildpack mars/create-react-app`
- (If you forgot you can later `heroku buildpacks:set https://github.com/mars/create-react-app-buildpack` instead.)

Add both as git remotes with `git remote add [remote name] [remote heroku git url]`

- `git remote add heroku-server https://git.heroku.com/my-new-backend`

- OR `heroku git:remote -a my-new-backend` ?

1. Deploy individual folders to one or both of the heroku remotes like so:

- `git subtree push --prefix server heroku-server master`

If you want to push from a different branch - `otherbranch:master`

Links of note -

- https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack
- aka https://github.com/mars/create-react-app-buildpack#usage
- https://devcenter.heroku.com/articles/nodejs-support#only-installing-dependencies

---

`heroku create -b https://github.com/mars/create-react-app-buildpack.git`

`heroku git:remote -a heroku-socketchat-client-alpha`
