variable "bucket" {
  type = string
}

variable "dns" {
  type = string
}

variable "certificate" {
  type = string
}

variable "drone" {
  type = string
}

variable "drone_test" {
  type    = string
  default = "http://localhost:5174"
}

variable "keyring" {
  type    = string
  default = "https://starknet-burner.vercel.app"
}

variable "test" {
  type    = string
  default = "http://localhost:3000"
}

variable "dawallet" {
  type    = string
  default = "https://da-wallet.blaqkube.io"
}
