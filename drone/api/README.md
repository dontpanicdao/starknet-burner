# Drone Simple Storage

Drone Simple Storage is a simple way of exchanging data between the burner and
drone the way it works is:
- the burner can store a session token request and the service returns a 6-digit
  code. Then you can use that 6-digit code to find the request back on drone
- once the session key signed, drone can store the detail so that the burner can
  import it

> Note: the session token is not useful per se as the sessionkey ensure the
> security and the token cannot be used without it. However whether the service
> is secure enough remains an open question for now.

## Configure the environment

This service provides a simple storage to exchange the data between drone and
the starknet burner. In order to deploy it, you must configure a number of files
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

## Deploying the service

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

## Using the service

The service provides 2 ways of exchanging data:

- storing/retrieving a request for a token

```shell
export BASEURL=https://...
export REQUESTID=$(curl -XPOST ${BASEURL}/requests \
  -d'{"key": "0xdeadbeef", "dappTokenID": "0xdeadbeef"}' | \
   jq -r '.requestID')
curl ${BASEURL}/requests/${REQUESTID}
```

> Note: to store a request, you should specify both the public key and the
> dappTokenID.

```shell
curl https://drone.carnage.sh/requests \
  -d'{"key": "0x2", "dappTokenID": "0x3"}'

# returns the output below
# {"requestID":"960958","key":"0x2","dappTokenID":"0x3"}

curl https://drone.carnage.sh/requests/960958

# returns the output below
# {"key": "0x2", "dappTokenID": "0x3"}
```

- storing/retrieving a session token

```shell
export BASEURL=https://...
curl -XPOST ${BASEURL}/authorizations \
  -d'{
	"key": "0xdeadbeef",
  "policies": [{"contractAddress": "0xdeadbeef", "selector": "transfert"}],
	"account": "0xdeadbeef",
	"root": "0xdeadbeef",
	"signature": ["0x1", "0x2"],
	"expires": 1659210039
  }'
curl ${BASEURL}/0xdeadbeef
```
