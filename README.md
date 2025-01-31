# Extract Selenide Screenshots from GitHub Workflow Logs

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

## General

This Action extracts base64 encoded images (screenshots) made by Selenide and
converts them to PNG. After that the images are uploaded to
a Chevereto instance, which can be hosted by yourself. Then
the image will be added to the step summary with Markdown. The images will be
saved in the working directory with the name "screenshot<index>.png".

## Usage

```yaml
uses: m0rr1s-p/extractSelenideScreenshot@release/v1
if: always()
with:
  gh-token: ${{ secrets.GITHUB_TOKEN }}
  run-id: ${{ github.run_id }}
  job-name: 'test_selenide'
  repo-name: ${{ github.repository }}
  hosting-url: ${{ vars.CHEVERETO_HOSTING_URL }}
  api-key: ${{ secret.CHEVERETO_API_KEY }}
  images: './*.png'
```

## Inputs

| Input       | Description                                                    |
|-------------|----------------------------------------------------------------|
| gh-token    | Personal Access Token for accessing the workflow run logs      |
| run-id      | The run ID of the job you want to extract the screenshots from |
| job-name    | The name of the job which creates the logs                     |
| repo-name   | The name of the repository where the workflow job runs         |
| images      | The pattern for the image files you want to upload             |
| hosting-url | The URL of your Chevereto instance                             |
| api-key     | Your Chevereto API key                                         |


## Outputs

None. Just the step summary. 
test-13072152332
test-13072154110
test-13072156451
test-13072159401
test-13072161103
test-13072163608
test-13072166897
test-13072168886
test-13072171254
test
