provider "aws" {
  region = var.region
}

# VPC Module
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"
  name = "cuepoint-vpc"
  cidr = "10.0.0.0/16"
  azs = ["${var.region}a", "${var.region}b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  enable_nat_gateway = true
  single_nat_gateway = true
}

# Security Groups
resource "aws_security_group" "db" {
  name        = "cuepoint-db-sg"
  description = "Allow inbound traffic from EKS"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }
}

resource "aws_security_group" "redis" {
  name        = "cuepoint-redis-sg"
  description = "Allow inbound traffic from EKS"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"
  version = "19.16.0"
  cluster_name = "cuepoint-cluster"
  subnet_ids = module.vpc.private_subnets
  vpc_id = module.vpc.vpc_id
  eks_managed_node_groups = {
    general = {
      desired_size = 2
      max_size     = 3
      min_size     = 1
      instance_types = ["t3.medium"]
    }
  }
}

# RDS (PostgreSQL)
resource "aws_db_subnet_group" "default" {
  name       = "cuepoint-db-subnet-group"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_db_instance" "default" {
  allocated_storage      = 20
  db_name                = "cuepoint"
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.t3.micro"
  username               = var.db_username
  password               = var.db_password
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.default.name
}

# S3 Bucket (MinIO replacement)
resource "aws_s3_bucket" "assets" {
  bucket_prefix = "cuepoint-media-"
}

# ElastiCache (Redis)
resource "aws_elasticache_subnet_group" "default" {
  name       = "cuepoint-redis-subnet-group"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "cuepoint-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.default.name
  security_group_ids   = [aws_security_group.redis.id]
}
