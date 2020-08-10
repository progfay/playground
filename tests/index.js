const { play } = require('../lib')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

play((group, run) => {
  run('first', async console => {
    console.log('hoge', 'fuga')
    await sleep(1000)
    console.log('piyo', 'buzz')
  })

  group('second', (group, run) => {
    run('error handling', () => {
      console.log(JSON.parse(NaN))
      console.log('piyo', 'buzz')
    })

    run('long', console => {
      console.log(`t${'o'.repeat(300)} long`)
      console.log(`t${'o'.repeat(300)} long`)
    })

    run('date', async console => {
      for (let i = 0; i < 30; i++) {
        await sleep(100)
        console.log(new Date())
      }
    })
  })

  group('nest', (group, run) => {
    group('re:nest', (group, run) => {
      run('re:re:nest', console => {
        console.log(1234)
      })
    })
  })
}, { debug: false })
