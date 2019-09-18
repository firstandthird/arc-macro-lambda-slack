module.exports = function (arc, cloudformation, stage) {
  cloudformation.Resources.LambdaSlackHandler = {
    Type: 'AWS::Serverless::Function',
    Properties: {
      Handler: 'index.handler',
      CodeUri: 's3://lambda-slack-handler/95361e066812645ea1d403c78ced1e86',
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
