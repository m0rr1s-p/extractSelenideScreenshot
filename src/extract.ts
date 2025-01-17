import * as fs from 'node:fs'
import * as core from '@actions/core'
//import { SummaryTableCell } from '@actions/core/lib/summary'

// extract images
export function getImage(data: string): void {
  // get the start index of search string in the log
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
  // get the end index of the base64 string
  function getEndOf(startIndex: number, offset: number): number {
    const sub = data.substring(startIndex)
    return (
      sub.indexOf(
        '[main] INFO  c.m.s.s.TestResultLoggerExtension - ------------------------------------------------------------------------------------'
      ) -
      offset +
      startIndex
    )
  }
  const indicesImages = getIndicesOf('Screenshot:', data)
  const indicesTest = getIndicesOf('Test Failed for test', data)
  //for (const index of indicesImages)
  indicesImages.forEach((indexOfImage, index) => {
    // the offset of 42 is not only the answer to everything but also the length of the timestamp
    const base64Image = data.substring(
      indexOfImage + 103,
      getEndOf(indexOfImage, 42)
    )
    const testName = data.substring(
      indicesTest[index],
      getEndOf(indicesTest[index], 42)
    )
    //console.log(base64Image)
    const imageName = `screenshot${indexOfImage}.png`
    const buf = Buffer.from(base64Image, 'base64')
    fs.writeFile(imageName, buf, function (err) {
      if (err) throw err
      console.log(`Saved as ${imageName}`)
    })
    const tableData = [
      { data: 'Header1', header: true },
      { data: 'Header2', header: true },
      { data: 'Header3', header: true },
      { data: imageName },
      { data: testName },
      { data: 'MyData3' }
    ]
    core.summary.addTable([tableData])
  })
}
