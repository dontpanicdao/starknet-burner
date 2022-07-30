terraform {
  backend "s3" {
    bucket         = var.bucket
    key            = "state/burner.state"
    region         = "us-east-1"
  }
}
