module.exports = function (arc, cloudformation, stage) {
  cloudformation.Resources.LambdaSlackHandler = {
    Type: 'AWS::Serverless::Function',
    Properties: {
      Handler: 'index.handler',
      CodeUri: 's3://lambda-slack-handler/1.3.1.zip',
      Runtime: 'nodejs10.x',
      MemorySize: 128,
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
