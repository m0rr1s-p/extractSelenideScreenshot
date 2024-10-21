import * as core from '@actions/core'
import { v2 as cloudinary } from 'cloudinary'
//import * as path from 'path'

export async function uploader(
  cloudName: string | undefined,
  apiKey: string | undefined,
  apiSecret: string | undefined,
  paths: string[]
): Promise<void> {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  })
  for (const path of paths) {
    cloudinary.uploader
      .upload(path, {
        use_filename: true,
        overwrite: true
      })
      .then(result => {
        core.summary
          .addHeading('Selenide Screenshots', '2')
          .addImage(result.secure_url, result.public_id)
          .write()
        core.info(
          `Uploaded ${result.secure_url} as ${result.public_id} to Cloudinary`
        )
      })
  }
}
