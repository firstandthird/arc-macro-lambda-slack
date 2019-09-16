module.exports = function (arc, cloudformation, stage) {
  cloudformation.Resources.LambdaSlackHandler = {
    Type: 'AWS::Serverless::Function',
    Properties: {
      Handler: 'index.handler',
      CodeUri: 's3://lambda-slack-handler/42dc4761e78fd0e90d9579d7c10d6674',
      Runtime: 'nodejs10.x',
      MemorySize: 1152,
      Timeout: 5,
      Environment: {
        Variables: {
        }
      },
      Role: {
        'Fn::Sub': [
          'arn:aws:iam::${AWS::AccountId}:role/${roleName}',
          {
            roleName: {
              Ref: 'Role'
            }
          }
        ]
      }
    }
  };

  return cloudformation;
};
