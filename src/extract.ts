import * as fs from 'node:fs'
export function getImage(data: string): void {
  function getIndicesOf(searchStr: string, str: string): number[] {
    const searchStrLen = searchStr.length
    if (searchStrLen == 0) {
      return []
    }
    let startIndex = 0,
      index
    const indices = []
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index)
      startIndex = index + searchStrLen
    }
    return indices
  }
  function getEndOf(startIndex: number): number {
    const sub = data.substring(startIndex)
    return (
      sub.indexOf(
        '[main] INFO  c.m.s.s.TestResultLoggerExtension - ------------------------------------------------------------------------------------'
      ) -
      42 +
      startIndex
    )
  }
  const indices = getIndicesOf('Screenshot:', data)
  for (const index of indices) {
    const base64Image = data.substring(index + 103, getEndOf(index))
    console.log(base64Image)
    const imageName = `screenshot${index}.png`
    const buf = Buffer.from(base64Image, 'base64')
    fs.writeFile(imageName, buf, function (err) {
      if (err) throw err
      console.log(`Saved as ${imageName}`)
    })
  }
}
