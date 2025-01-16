import * as core from '@actions/core'
import * as child_process from 'child_process'
//import * as path from 'path'

//export async function uploader(
//  hostingUrl: string | undefined,
//  apiKey: string | undefined,
//  paths: string[]
//): Promise<void> {
//  cloudinary.config({
//    cloud_name: cloudName,
//    api_key: apiKey,
//    api_secret: apiSecret
//  })
//  for (const path of paths) {
//    const { exec } = require('child_process');
//    exec(`curl --fail-with-body -X POST -H "X-API-Key: $\{api_key}" -F "source=@$\{path}" ${hostingUrl}`)
//  }
//}
export async function uploader(
  hostingUrl: string | undefined,
  apiKey: string | undefined,
  paths: string[]
): Promise<void> {
  core.summary.addHeading('Selenide Screenshots', '2')
  for (const path of paths) {
    await new Promise(r => setTimeout(r, 2000))
    child_process.exec(
      `curl -s --fail-with-body -X POST -H "X-API-Key: ${apiKey}" -F "source=@${path}" ${hostingUrl}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`)
          return
        }
        const response = JSON.parse(stdout)
        core.summary.addRaw(response.image.name)
        core.summary.addImage(response.image.url, response.image.name)
        core.summary.write()
      }
    )
  }
}
