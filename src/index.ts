export const group = (groupName: string, func: () => void) => {
  console.group(groupName)
  func()
  console.groupEnd()
}
