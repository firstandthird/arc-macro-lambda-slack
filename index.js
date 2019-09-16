module.exports = function (arc, cloudformation, stage) {
  cloudformation.Resources.LambdaSlackHandler = {
    Type: 'AWS::Serverless::Function',
    Properties: {
      Handler: 'index.handler',
      CodeUri: './node_modules/lambda-slack-handler',
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
