import * as core from '@actions/core'
import * as github from '@actions/github'
import { getImage } from './extract'
import { uploader } from './upload'
import { glob } from 'glob'
//import * as fs from 'node:fs'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
function isJson(str: string): boolean {
  try {
    JSON.parse(str)
  } catch (e) {
    console.log(e)
    return false
  }
  return true
}

export async function run(): Promise<void> {
  try {
    core.debug('Get input for "gh-token"')
    const ghToken: string = core.getInput('gh-token', { required: true })

    core.debug('Get octokit instance')
    const octokit = github.getOctokit(ghToken)

    const repoOwner = core.getInput('repo-owner')
    core.debug(`Repo owner: ${repoOwner}`)

    const repoName = core.getInput('repo-name').replace(`${repoOwner}/`, '')
    core.debug(`Repo name: ${repoName}`)

    core.debug(`Job ID ${core.getInput('run-id')}`)
    core.debug('Getting workflow jobs')
    const resJobs = await octokit.rest.actions.listJobsForWorkflowRun({
      run_id: Number(core.getInput('run-id')),
      owner: repoOwner,
      repo: repoName
    })

    const job = resJobs.data.jobs.filter(
      val => val.name === core.getInput('job-name')
    )

    core.debug(`Job ID: ${job[0].id}`)

    core.debug('Getting workflow logs')
    const workflowLogs =
      await octokit.rest.actions.downloadJobLogsForWorkflowRun({
        job_id: job[0].id,
        owner: repoOwner,
        repo: repoName
      })
    core.summary.addHeading('Selenide Screenshots', '2')
    getImage(String(workflowLogs.data))

    const hostingUrl: string | undefined = core.getInput('hosting-url')
    const apiKey: string | undefined = core.getInput('api-key')
    const imagesPath = core.getInput('images')

    let paths: string[]
    if (isJson(imagesPath)) {
      paths = JSON.parse(imagesPath)
    } else {
      paths = glob.sync(imagesPath)
    }

    uploader(hostingUrl, apiKey, paths)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
