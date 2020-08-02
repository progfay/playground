const { play } = require('../lib')

play([
  'first',
  console => {
    console.log('hoge', 'fuga')
    console.log('piyo', 'buzz')
  },
  [
    'second',
    console => {
      console.log(JSON.parse(NaN))
    },
    console => {
      console.log(`t${'o'.repeat(300)} long`)
      console.log(`t${'o'.repeat(300)} long`)
    },
    console => {
      console.log(new Date())
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
