const { play } = require('../lib')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

play([
  'first',
  async console => {
    console.log('hoge', 'fuga')
    await sleep(1000)
    console.log('piyo', 'buzz')
  },
  [
    'second',
    console => {
      console.log(JSON.parse(NaN))
      console.log('piyo', 'buzz')
    },
    console => {
      console.log(`t${'o'.repeat(300)} long`)
      console.log(`t${'o'.repeat(300)} long`)
    },
    async console => {
      for (let i = 0; i < 30; i++) {
        await sleep(100)
        console.log(new Date())
      }
    },
    [
      'third',
      [
        'fourth',
        [
          'fifth',
          console => {
            console.log(1234)
          }
        ]
      ]
    ]
  ]
])
