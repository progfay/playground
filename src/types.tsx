export type Unit = (console: Console) => void
export type Group = Unit | [string, ...Group[]]
