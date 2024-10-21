//import * as core from '@actions/core'
import { v2 as cloudinary } from 'cloudinary'
//import * as path from 'path'

export async function uploader(
  cloudName: string | undefined,
  apiKey: string | undefined,
  apiSecret: string | undefined
): Promise<void> {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  })
  await cloudinary.uploader
    .upload('screenshot3682069.png', {
      use_filename: true,
      overwrite: true
    })
    .then(result => {
      console.log(result)
    })
}
