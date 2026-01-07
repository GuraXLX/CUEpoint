# Deployment Guide

## Overview
CuePoint AI is designed to run on Kubernetes.

## Local Kubernetes (k3s/Kind)
1. Ensure `kubectl` is configured.
2. Apply manifests:
   ```bash
   kubectl apply -f k8s/secrets.yaml
   kubectl apply -f k8s/
   ```

## AWS Deployment (Production)

### Prerequisites
- AWS CLI configured
- Terraform installed

### Steps
1. **Provision Infrastructure**:
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```
   This will create the VPC, EKS Cluster, RDS instance, and ElastiCache.

2. **Configure kubectl**:
   ```bash
   aws eks update-kubeconfig --region us-east-1 --name cuepoint-cluster
   ```

3. **Deploy Microservices**:
   - Build and push your Docker images to ECR (Elastic Container Registry).
   - Update `k8s/*.yaml` image tags to point to your ECR images.
   - Apply manifests:
     ```bash
     kubectl apply -f k8s/
     ```

4. **Verify**:
   Get the Ingress load balancer URL:
   ```bash
   kubectl get ingress
   ```
