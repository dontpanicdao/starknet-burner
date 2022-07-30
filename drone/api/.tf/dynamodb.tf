resource "aws_dynamodb_table" "sessionkey" {
  name         = "${terraform.workspace}BurnerSession"
  hash_key     = "sessionKey"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
	name  = "sessionKey"
	type  = "S"
  }
  
  ttl {
    attribute_name = "TTL"
    enabled        = false
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
    ]
  }
}

resource "aws_iam_policy" "dynamodb_policy" {
  name        = "${terraform.workspace}BurnerSessionPolicy"
  description = "The policy to access the Burner Wallet Session Token"
  policy      = data.aws_iam_policy_document.dynamodb.json
}

resource "aws_iam_role_policy_attachment" "dynamodb_for_lambda" {
  policy_arn = aws_iam_policy.dynamodb_policy.arn
  role       = aws_iam_role.iam_for_lambda.name
}
