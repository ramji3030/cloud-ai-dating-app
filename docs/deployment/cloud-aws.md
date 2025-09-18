# Production Deployment: AWS + Terraform Guide

This guide will help you deploy the Cloud AI Dating App to AWS using best practices in Infrastructure as Code, Docker, and Kubernetes.

---

## 1. Infrastructure Setup

- All Terraform configs are in `/infrastructure/aws/terraform`
- Resources provisioned include:
  - EKS (Kubernetes cluster)
  - AWS RDS (database)
  - S3 (static assets/profile media)
  - VPC, subnets, security groups, IAM roles, and Secrets Manager

### Steps:
```bash
# Configure AWS CLI with IAM credentials (least privilege)
aws configure

cd infrastructure/aws/terraform

terraform init
terraform plan
terraform apply
```

**Tip:** Keep your backend remote (S3/dynamodb) for Terraform state.

---

## 2. Build & Push Docker Images

You can use GitHub Actions (CI) or local commands.

```bash
# Example local build & push (replace with your repo/ecr url)
docker build -t your-dating-app-backend:latest backend/
docker build -t your-dating-app-frontend:latest frontend/

# Push to ECR or DockerHub
docker tag your-dating-app-backend:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/dating-backend:latest
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/dating-backend:latest
```

---

## 3. Kubernetes Deployment

- Update the `k8s/` manifests with your image URLs and secrets references
- Apply configs (secrets, services, ingress, deployments, configmaps):

```bash
kubectl apply -f k8s/
```

**Expose with AWS ALB/ELB** (see `k8s/ingress.yaml` for setup)

---

## 4. Post-deployment

- Verify that pods are running: `kubectl get pods`
- Ensure external endpoints are healthy (frontend, API, chat)
- Use AWS Secrets Manager for secure handling of credentials and API keys

---

## 5. Monitoring & Scaling

- Use AWS CloudWatch & EKS console for monitoring
- Horizontal auto-scaling can be configured in Kubernetes

---

_See `/docs/` for related configuration and usage guides. For further help, join the community or open an Issue._
