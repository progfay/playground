import type { RenderOptions } from 'ink'

export type Func = (console: Console) => void
export type Run = (name: string, func: Func) => void
export type Nest = (bundle: Bundle, run: Run) => void
export type Bundle = (name: string, nest: Nest) => void
export type Play = (nest: Nest, opts?: NodeJS.WriteStream | RenderOptions) => void

export interface Group {
  type: 'group'
  name: string
  uuid: string
  nest: Nest
}

export interface Unit {
  type: 'unit'
  name: string
  uuid: string
  func: Func
}

export type Pack = Group | Unit
