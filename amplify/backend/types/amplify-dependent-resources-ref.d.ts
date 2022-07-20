export type AmplifyDependentResourcesAttributes = {
    "api": {
        "amplifyapp": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "amplifyappc10a5bb3": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "registerlinkemailer": {
          "Name": "string",
          "Arn": "string",
          "Region": "string",
          "LambdaExecutionRole": "string"
        },
        "S3Trigger3ac458d4": {
          "Name": "string",
          "Arn": "string",
          "Region": "string",
          "LambdaExecutionRole": "string"
        }
    },
    "storage": {
        "S3Storage": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}
