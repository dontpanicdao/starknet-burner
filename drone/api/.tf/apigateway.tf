resource "aws_apigatewayv2_api" "api" {
  name          = "drone${terraform.workspace}api"
  protocol_type = "HTTP"
  target        = aws_lambda_function.lambda.arn

  cors_configuration {
    allow_credentials = true
    allow_origins     = [var.drone, var.keyring, var.test, var.drone_test, var.dawallet]
    allow_methods     = ["GET", "PUT", "POST", "DELETE"]
    allow_headers     = ["Authorization", "Content-Type", "X-Amz-Date", "X-Amz-Security-Token", "Accept", "Referer", "User-Agent", "sec-ch-ua", "sec-ch-ua-mobile", "sec-ch-ua-platform"]
  }
}

resource "aws_lambda_permission" "apigw" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

data "aws_route53_zone" "domain" {
  name = "${var.dns}."
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = "drone.${var.dns}"

  domain_name_configuration {
    certificate_arn = var.certificate
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_route53_record" "api" {
  name    = aws_apigatewayv2_domain_name.api.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.domain.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.api.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_api_mapping" "mapping" {
  api_id      = aws_apigatewayv2_api.api.id
  domain_name = aws_apigatewayv2_domain_name.api.id
  stage       = aws_apigatewayv2_stage.production.id
}

resource "aws_apigatewayv2_stage" "production" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "production"
  auto_deploy = true
}
