# Drone Simple Storage

Once the sessionkey signed on drone the token should be generated and sent back
to the burner. This directory provides a simple storage to store the token and
re-import it on the burner.

> Note: the session token is not useful per se as the sessionkey ensure the
> security and the token cannot be used without it. However whether the service
> is secure enough remains an open question for now.

## Configure the environment

This service provides a simple storage to exchange the data between drone and
the burner wallet. In order to deploy it, you must configure a number of files
that are not part of the repository

- `.env` contains a number of parameter to build the lambda, including the
  bucket and profile to use with the `make publish`. `.env.profile` provides
  an example of the file content
- `.tf/backend.tf` contains the configuration to connect to AWS, including the
  profile, bucket or region to store the state. `.tf/backend.tf.template`
  provides an example of the content of the file
- `.tf/default.auto.tfvars` contains a number of variable that can be used to
  deploy the components on AWS. `.tf/default.auto.tfvars.template` provides an
  example of the content of the file

## How to deploy the service

Once you have configure the connection to AWS and the various configuration,
you should be able to deploy the service with the following commands:

```shell
## compile the lambda and deploy to on S3
make publish
## configure and install the AWS configuration
cd .tf
terraform init
terraform apply
```
