resource "aws_dynamodb_table" "sessionkey" {
  name         = "${terraform.workspace}BurnerSession"
  hash_key     = "sessionPublicKey"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "sessionPublicKey"
    type = "S"
  }

  ttl {
    attribute_name = "TTL"
    enabled        = true
  }
}

resource "aws_dynamodb_table" "request" {
  name         = "${terraform.workspace}BurnerRequest"
  hash_key     = "requestID"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "requestID"
    type = "S"
  }

  ttl {
    attribute_name = "TTL"
    enabled        = true
  }

}

data "aws_iam_policy_document" "sessionkey" {
  policy_id = "${terraform.workspace}BurnerSessionPolicy"
  statement {
    sid    = "BurnerSessionTable"
    effect = "Allow"
    actions = [
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
    ]
    resources = [
      aws_dynamodb_table.sessionkey.arn,
      aws_dynamodb_table.request.arn,
    ]
  }
}

resource "aws_iam_policy" "dynamodb_policy" {
  name        = "${terraform.workspace}BurnerSessionPolicy"
  description = "The policy to access the Burner Wallet Session Token"
  policy      = data.aws_iam_policy_document.sessionkey.json
}

resource "aws_iam_role_policy_attachment" "dynamodb_for_lambda" {
  policy_arn = aws_iam_policy.dynamodb_policy.arn
  role       = aws_iam_role.iam_for_lambda.name
}
