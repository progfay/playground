import _Console from 'console'
import chalk from 'chalk'

interface Console {
  readonly _console: typeof _Console,
  _indentCount: number,
  readonly _indentText: string,

  group: (name: string, func: (console: Console) => void) => void
  log: (...data: any[]) => void
}

export const play = (func: (console: Console) => void) => {
  const console: Console = {
    _console: new _Console.Console({
      stdout: process.stdout,
      stderr: process.stderr,
    }),
    _indentCount: 0,
    _indentText: '    ',

    group: (name, func) => {
      process.stdout.write(console._indentText.repeat(console._indentCount) + chalk.blueBright(name) + '\n')
      console._indentCount++
      func(console)
      console._indentCount--
    },

    log: (...args) => {
      process.stdout.write(console._indentText.repeat(console._indentCount))
      console._console.log(...args)
    }
  }

  func(console)
}
