data "external" "version" {
  program = ["${path.module}/artifact.sh"]

  query = {
    workspace = terraform.workspace
  }
}

output "version" {
  value = data.external.version.result["version"]
}
