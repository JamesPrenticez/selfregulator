### Setup Monorepo
Protip: Use powershell
```bash
npx create-nx-workspace@latest selfregulator

NX   Let's create a new workspace [https://nx.dev/getting-started/intro]
√ Which stack do you want to use? · none
√ Package-based monorepo, integrated monorepo, or standalone project? · integrated
'git' is not recognized as an internal or external command,
operable program or batch file.
√ Which CI provider would you like to use? · skip
√ Would you like remote caching to make your build faster? · yes
√ Will you be using GitHub as your git hosting provider? · Yes
```
```bash
git init
npm install --save-dev @nx/react
npx nx g @nx/react:application selfregulator-frontend --directory=apps/selfregulator/frontend
```
### Setup React
(React Tutorial)[https://nx.dev/getting-started/tutorials/react-monorepo-tutorial]
```bash
  npm install --save-dev @nx/react
  npx nx g @nx/react:application selfregulator-frontend --directory=apps/selfregulator/frontend
```

### Setup Express
```bash
npx nx add @nx/express
npx nx g @nx/express:app selfregulator-backend --directory=apps/selfregulator/backend
```

### Setup Libs
```bash
npx nx g @nx/react:library shared-ui --directory=libs/shared/ui --unitTestRunner=vitest --bundler=none
```

#### Add Tailwind to it
```bash
npx nx g @nx/react:setup-tailwind <library-name>
```
