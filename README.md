## Getting Started
[x] [NodeJS](https://nodejs.org/en/) \
[x] [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) (optional) \
[x] Prettier [VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) / [Jetbrains](https://plugins.jetbrains.com/plugin/10456-prettier) \
[x] Eslint [VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 

0. create .env file from .env.example - you can ask for variables values from your team leader
1. Install dependences:
   `npm install`
2. Run the development server:
`npm run dev`
3. open in web browser: `http://localhost:3000/`

- manual error check: `npm run lint` and `npm run check-ts`
- please note that you will not be able to commit changes until you solve all errors
- strive to ensure that there are not even warnings in the project
- we use `cn` library for conditional classes
- we use memoization wrehe it needs (React.memo / useMemo / useCallback)
- we use `react-query` (useMutation/useQuery) and `axios` for api calls in components
- we dont leave unnecessary comments in code
- component name starts form uppercase letter
- component file name the same as component function name inside this file
- we use readable variables names (no 'x', 'a' etc.) 
- search for keyword `FIXME` to find places to fix
- `react-icons` search https://react-icons.github.io/react-icons/search

## Commit Message Guidelines

1. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
2. [Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```
```
examples:
build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
docs: Documentation only changes
feat: A new feature
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
test: Adding missing tests or correcting existing tests
```

## File Structure

[!]default export pages ONLY

├── components \
│ ├── ui (we store components that are not tied to the current project, for example, Tooltip/Heading/Button) \
│ ├── local (We store components that are tied to the current project, for example, Header/Footer, DO NOT confuse with the components folder in the page folder, here we store components that are used NOT ONLY on 1 page (multiple times))\
| ├── __pages__
| ├── __forms__
│ └── modals (store all modal windows here) \
├── prisma - database \
├── constants (store global constants here) \
├── helpers (store hepler functions that you need to use in this project here). \
├── hooks (store custom hooks here) \
├── app (store application pages here) \
│ ├──[pageName1] (page name folder - store page files here)\
│ └──[pageName2] (store page files here)\
├── public (static files global-styles/images/fonts/files etc.) \
├── stores (global app stores) \
├── test (unit / integration / e2e tests)\
├── utils (store additional utilities functions here)\
└── types (store global types here)
