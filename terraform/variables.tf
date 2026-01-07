variable "region" {
  default = "us-east-1"
}
variable "db_username" {
  default = "cuepoint_user"
}
variable "db_password" {
  description = "Database password"
  sensitive   = true
}
