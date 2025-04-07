## Architecture Overview

This deployment uses the following AWS services:

- **ECS (Elastic Container Service)** - For container orchestration
- **ECR (Elastic Container Registry)** - For storing Docker images
- **RDS (PostgreSQL)** - For database storage
- **ElastiCache (Redis)** - For caching and session storage
- **VPC** - With public and private subnets for secure networking
- **ALB (Application Load Balancer)** - For routing traffic to the ECS service

The deployment follows best practices for security, scalability, and maintainability.

## Prerequisites

Before deploying, ensure you have:

1. An AWS account with appropriate permissions
2. AWS credentials configured with access to create the necessary resources
3. A GitHub repository with your Medusa application code

```

## Deployment Process

This repository uses GitHub Actions and Terraform to automate the deployment process to AWS ECS.

### Environment Variables

Create a `.env` file in the root directory with the following variables (do not commit this file):

```
aws_region = "us-west-1"
ecr_repository_url = "YOUR_AWS_ACCOUNT_ID.dkr.ecr.us-west-1.amazonaws.com/medusa-backend"
db_username = "your_username"
db_password = "your_secure_password"
cookie_secret = "your_long_secure_cookie_secret"
jwt_secret = "your_long_secure_jwt_secret"
```

### GitHub Secrets

Set up the following secrets in your GitHub repository:

1. `AWS_ACCESS_KEY_ID` - AWS access key
2. `AWS_SECRET_ACCESS_KEY` - AWS secret key
3. `DB_USERNAME` - Database username (fallback if not in .env)
4. `DB_PASSWORD` - Database password (fallback if not in .env)
5. `COOKIE_SECRET` - Cookie secret for Medusa
6. `JWT_SECRET` - JWT secret for Medusa

### Deployment Steps

1. **Initialize Terraform (local development only)**
   ```bash
   cd terraform
   terraform init
   ```

2. **Push to Main Branch**
   - When code is pushed to the `main` branch, the GitHub Actions workflow will:
     1. Build the Docker image
     2. Push it to ECR
     3. Run Terraform to provision or update infrastructure
     4. Deploy the new image to ECS

3. **Monitor Deployment**
   - Monitor the GitHub Actions workflow for deployment status
   - Check AWS Console for ECS service status

### Manual Deployment

You can also deploy manually:

```bash
# Build and tag Docker image
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/medusa-backend:latest .

# Push to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/medusa-backend:latest

# Deploy with Terraform
cd terraform
terraform apply -var-file=terraform.tfvars
```

## Failure Handling

The deployment process includes automatic cleanup in case of failure. If Terraform fails to apply the changes, it will automatically destroy any resources that were created during the failed deployment to prevent orphaned resources and incomplete infrastructure.


