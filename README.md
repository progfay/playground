# @progfay/playground

Framework to tasting something with Node.js 😋

## Features

- Display playground result in hierarchical structure
- Grouping some playground functions
- Support async function
- Provide same API as `Console` Object
- Keep color highlighting of log


## Syntax

```js
play((bundle, run) => {
  bundle('grouping', (bundle, run) => {
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

#### `nest: (bundle, run) => void`

- Exported type: `nest: Nest`

##### `bundle: (name, nest) => void`

- Bundle some playgrounds or sub-bundles
- Exported type: `bundle: Bundle`


###### `name: string`

- Name of group which is bundled


###### `nest: Nest`

- `nest` behaves like first argument of `play`


##### `run: (name, func) => void`

- Name of single playground function
- Exported type: `run: Run`


###### `func: (console) => void`

- Single playground function
- First argument `console` is `Console` Object
- Exported type: `func: Func`
