cd .\Angular\powerbi-client-angular
try {
  # package.json is in Angular\powerbi-client-angular folder, while version.ps1 runs in .pipelines folder.
  $version = (Get-Content "package.json") -join "`n" | ConvertFrom-Json | Select -ExpandProperty "version"
  $revision = $env:CDP_DEFINITION_BUILD_COUNT_DAY
  $buildNumber = "$version.$revision"

  Write-Host "Build Number is" $buildNumber
  
  # This will allow you to use it from env var in later steps of the same phase
  [Environment]::SetEnvironmentVariable("Version", $version, "User")
  [Environment]::SetEnvironmentVariable("CustomBuildNumber", $buildNumber, "User")
  Write-Host "##vso[build.updatebuildnumber]${buildNumber}"                         # This will update build number on your build
}
catch {
  Write-Error $_.Exception
  exit 1;
}
