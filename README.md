# mercans-test

## The design

The design is made using Adobe XD, which I was unfamiliar with. I found the browser interface very difficult to use.
The panning does not work 9 times out of 10 in the specs view. This made it very cumbersome to move around the page.
Another pain point was selecting the items and trying to view their dimensions and distance from other items. Compared to Figma, I found it unintuitive and slow.

The design uses a lot of different and undocumented colors and text styles. The spacings were also inconsistent.
This, mixed with the previous issues meant that I had to eyeball a lot of the spacings and couldn't use any readable abstractions for the colors and styles.

## Project setup

I used the standard Vue project setup process via `pnpm init vue@latest`. During the process I added TypeScript.
I moved the icons and payslips to their respective folders and added `normalize.css`, and corrected the provided base css files. For the fonts I included `@fontsource/source-sans-pro` and `vite-svg-loader` for the icons.

## Development

The first step was setting up the router. This was straightforward as subroutes were not needed. I added the provided routes from the `menuLinks.json` file.

Then I started working on the `MainLayout.vue` component, which I could use as a wrapper for the whole application. I omited the sidebar animation and closed state as it was not provided in the design.

The payslips view was time-consuming as there were many small details and animations to consider. There weren't any designs for smaller viewports, so I made the same design work on as small screen as I could.

The data flow is straightforward and does not currently need to use any complex state management.

## Next Steps

Here is a non-comprehensive list of things I would like to add:

- Sidebar closed state
- Mobile and Tablet views
- Data flow from the API
- Testing

## Time Tracking

This project took 12 hours and 45 minutes.

# Vue default README.md

This template should help get you started developing with Vue 3 in Vite

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
