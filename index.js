module.exports = function (arc, cloudformation, stage) {
  if (process.env.SLACK_WEBHOOK) {
    arc.slack = [[stage, process.env.SLACK_WEBHOOK]];
  }
  if (!arc.slack) {
    throw new Error('Missing slack webhook');
  }

  const envs = {};

  arc.slack.forEach(item => {
    envs[item[0]] = item[1];
  });

  if (!envs[stage]) {
    throw new Error(`Missing slack webhook for stage: ${stage}`);
  }

  const url = envs[stage];

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
          SLACK_HOOK: url
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
