@AGENTS.md

# This folder is on the live production server

`/var/www/html/channel_peeker` is the git checkout on the server that hosts channelpeeker.com. The site is deployed from it (pm2 app `channelpeeker`, nginx → port 4010; releases live in `/var/www/html/channel_peeker-releases`).

- **Never run builds, installs or tests in this folder**: no `npm run build`, `npm ci`/`npm install`, `npm test`, `npx tsc`, `npm run lint`, `next dev`/`next start`. A build here once overwrote `.next` under the running server and broke the live site.
- **Always work in a separate git worktree** outside this folder (e.g. `git worktree add <scratch-dir>/wt <branch>`, then copy `.env` and install dependencies there with a real `node_modules`; Turbopack rejects a symlinked one). Build, test and run dev servers only there, on ports other than 4010/4011.
- **Deploy only via `./deploy.sh`, and only when the user explicitly asks.** Same for `./deploy.sh rollback` / `switch`, `pm2 reload|restart|delete channelpeeker`, and pushing to GitHub. Details: DEPLOYMENT.md §4.
- Don't touch other pm2 apps or nginx sites on this server.
