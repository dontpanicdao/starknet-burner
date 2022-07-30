terraform {
  backend "s3" {
    profile        = "resetlogs"
    bucket         = "bots-registry.blaqkube.io"
    key            = "state/burner.state"
    region         = "us-east-1"
  }
}
