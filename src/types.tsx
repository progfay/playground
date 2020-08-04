export type Unit = (console: Console) => (void | Promise<void>)
export type Group = Unit | [string, ...Group[]]
