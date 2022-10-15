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

