# @progfay/playground

Framework to tasting something with Node.js 😋

## Installation

[![npm version](https://img.shields.io/npm/v/@progfay/playground?style=for-the-badge&message=NPM&color=CB3837&logo=NPM&labelColor=222222&label=npm)](https://www.npmjs.com/package/@progfay/playground)

```sh
npm i -D @progfay/playground
```


## Features

- Display playground result in hierarchical structure
- Grouping some playground functions
- Support async function
- Provide same API as `Console` Object
- Keep color highlighting of log


## Syntax

```js
play((group, run) => {
  group('grouping', (group, run) => {
    run('execute playground', console => {
      console.log('yummy 😋')
    })

    run('async function', async console => {
      console.log('sleep start')
      await sleep(1000)
      console.log('sleep end')
    })

    run('keep coloring', async console => {
      console.log(new Date('2020-01-01'))
    })
  })
})
```

[![Image from Gyazo](https://i.gyazo.com/d5860beba56967039616f3435abcf891.gif)](https://gyazo.com/d5860beba56967039616f3435abcf891)


## API

### `play(nest, opts): void`

- Start playgrounds
- No support for multiple `play` function call
- Exported type: `play: Play`

#### `nest: (group, run) => void`

- Exported type: `nest: Nest`

##### `group: (name, nest) => void`

- Group some playgrounds or sub-groups
- Exported type: `group: Group`


###### `name: string`

- Name of group which is groupd


###### `nest: Nest`

- `nest` behaves like first argument of `play`


##### `run: (name, func) => void`

- Name of single playground function
- Exported type: `run: Run`


###### `func: (console) => void`

- Single playground function
- First argument `console` is `Console` Object
- Exported type: `func: Func`
