variable "bucket" {
  type = string
}

variable "certificate" {
  type = string
}

variable "keyring" {
  type    = string
  default = "https://starknet-burner.vercel.app"
}

variable "keyringv2" {
  type    = string
  default = "https://keyring.qasar.xyz"
}

variable "keyring_test" {
  type    = string
  default = "http://localhost:3000"
}

variable "qasar" {
  type = string
}

variable "qasar_test" {
  type    = string
  default = "http://localhost:3001"
}

