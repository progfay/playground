import type { RenderOptions } from 'ink'

export type Func = (console: Console) => (void | Promise<void>)
export type Run = (name: string, func: Func) => void
export type Nest = (group: Group, run: Run) => void
export type Group = (name: string, nest: Nest) => void
export type Play = (nest: Nest, opts?: NodeJS.WriteStream | RenderOptions) => void

export interface Pack {
  type: 'pack'
  name: string
  uuid: string
  nest: Nest
  level: number
}

export interface Unit {
  type: 'unit'
  name: string
  uuid: string
  func: Func
  level: number
}

export type Assort = Pack | Unit
export type Status = 'Running' | 'Success' | 'Failed'
