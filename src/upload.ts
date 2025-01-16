import * as core from '@actions/core'
//import { v2 as cloudinary } from 'cloudinary'
//import * as path from 'path'
import * as fs from 'fs'
import * as process from 'node:process'

//export async function uploader(
//  cloudName: string | undefined,
//  apiKey: string | undefined,
//  apiSecret: string | undefined,
//  paths: string[]
//): Promise<void> {
//  cloudinary.config({
//    cloud_name: cloudName,
//    api_key: apiKey,
//    api_secret: apiSecret
//  })
//  for (const path of paths) {
//    cloudinary.uploader
//      .upload(path, {
//        use_filename: true,
//        overwrite: true
//      })
//      .then(result => {
//        core.summary
//          .addHeading('Selenide Screenshots', '2')
//          .addImage(result.secure_url, result.public_id)
//          .write()
//        core.info(
//          `Uploaded ${result.secure_url} as ${result.public_id} to Cloudinary`
//        )
//      })
//  }
//}

export async function uploader(
  hostingUrl: string,
  apiKey: string,
  paths: string[]
): Promise<void> {
  for (const path of paths) {
    // insert HTTP request function here

    const appPath = process.cwd()
    console.log('App Path: ', appPath)
    const filePath = appPath + '/' + path
    const fileStream = fs.createReadStream(filePath)
    const data = new FormData()
    // @ts-expect-error: testing
    data.append('source', fileStream)
    console.log('Body: ', data)
    console.log('URL: ', hostingUrl)
    console.log('Path: ', path)
    fetch(hostingUrl, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey
      },
      body: data
    }).then(response => {
      response.json().then(result => {
        core.summary.addImage(result.url, result.name).write()
        console.log('Result: ', result)
      })
    })
    //const request = new Request(hostingUrl, {
    //  method: 'POST',
    //  headers: {
    //    'X-API-Key': apiKey,
    //    'Content-Type': 'multipart/form-data'
    //  },
    //  body: data
    //})
    //console.log('Request: ', request.body)
    //try {
    //  const response = await fetch(request)
    //  const result = await response.json()
    //  console.log('Result: ', result)
    //  await core.summary
    //    .addHeading('Selenide Screenshots', '2')
    //    .addImage(result.url, result.name)
    //    .write()
    //} catch (error) {
    //  console.error('Error: ', error)
    //}
  }
}
