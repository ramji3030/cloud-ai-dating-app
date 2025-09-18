# Infrastructure

This directory contains the Terraform Infrastructure as Code (IaC) configurations for the Cloud AI Dating App.

## Overview

The infrastructure is designed to provision and manage AWS resources using Terraform, including:

- VPC and networking components
- Security groups and access controls
- EKS cluster for container orchestration
- RDS databases for data storage
- S3 buckets for static assets
- CloudFront distributions for content delivery
- IAM roles and policies

## Files

- `main.tf` - Main Terraform configuration with core AWS resources
- `variables.tf` - Input variables definition (to be added)
- `outputs.tf` - Output values definition (to be added)
- `terraform.tfvars.example` - Example variables file (to be added)

## Prerequisites

- Terraform >= 1.0
- AWS CLI configured with appropriate credentials
- AWS account with necessary permissions

## Usage

1. Initialize Terraform:
```bash
terraform init
```

2. Review the planned changes:
```bash
terraform plan
```

3. Apply the configuration:
```bash
terraform apply
```

## Environment Variables

Set the following environment variables or use a `.tfvars` file:

- `TF_VAR_environment` - Environment name (staging, production)
- `TF_VAR_aws_region` - AWS region (default: us-east-1)

## Security

- All resources are tagged with environment and project identifiers
- Security groups follow principle of least privilege
- IAM roles use minimal required permissions
- Sensitive values should be stored in AWS Secrets Manager

## Maintenance

- Resources are organized by logical groupings
- State files should be stored remotely (S3 + DynamoDB)
- Regular updates to provider versions recommended
- Infrastructure changes should go through CI/CD pipeline
