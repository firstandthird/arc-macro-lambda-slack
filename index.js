module.exports = function (arc, cloudformation, stage) {
  cloudformation.Resources.LambdaSlackHandler = {
    Type: 'AWS::Serverless::Function',
    Properties: {
      Handler: 'index.handler',
      CodeUri: 's3://lambda-slack-handler/27449041250b1e83b79fb7394d0e5bdc',
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
