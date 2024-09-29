# Netlify - Static Site Hosting

https://docs.netlify.com/cli/get-started/

```bash
  netlify init
```

So a few things... 
Firstly vite isnt a production dependancy so remote builds wont work
We have to disable them by stopping build [https://docs.netlify.com/configure-builds/stop-or-activate-builds/#stop-builds]
Then we use nx to manually build and deploy to netlify [https://docs.netlify.com/cli/get-started/#manual-deploys]

```bash
nx run selfregulator:deploy -- --dir=dist/apps/selfregulator
```

deployed url = https://66f8c59f90b096a9dbdcee3b--selfregulator.netlify.app/

