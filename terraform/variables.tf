variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "us-west-1"
}

variable "ecr_repository_url" {
  description = "URL of the ECR repository for Medusa"
  type        = string
}

variable "db_username" {
  description = "PostgreSQL database username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "PostgreSQL database password"
  type        = string
  sensitive   = true
}

variable "cookie_secret" {
  description = "Cookie secret for Medusa"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret for Medusa"
  type        = string
  sensitive   = true
}
