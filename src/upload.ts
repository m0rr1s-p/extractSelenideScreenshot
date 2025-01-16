//import * as core from '@actions/core'
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

export function uploader(
  hostingUrl: string | undefined,
  apiKey: string | undefined,
  paths: string[]
): void {
  for (const path of paths) {
    child_process.exec(
      `curl --fail-with-body -X POST -H "X-API-Key: ${apiKey}" -F "source=@${path}" ${hostingUrl}`
    )
  }
}
