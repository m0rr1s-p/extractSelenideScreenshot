import * as core from '@actions/core'
import * as child_process from 'child_process'

export async function uploader(
  hostingUrl: string | undefined,
  apiKey: string | undefined,
  paths: string[]
): Promise<void> {
  for (const path of paths) {
    await new Promise(r => setTimeout(r, 2000))
    child_process.exec(
      `curl --fail-with-body -X POST -H "X-API-Key: ${apiKey}" -F "source=@${path}" -F "expiration=P7D" ${hostingUrl}`,
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
        core.summary.addRaw(response?.image?.title)
        core.summary.addImage(response?.image?.url, response?.image?.title)
        core.summary.write()
      }
    )
  }
}
