import * as core from '@actions/core'
import * as github from '@actions/github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
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
    console.log("This is my manual output")
    console.log(resJobs)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
