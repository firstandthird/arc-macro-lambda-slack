module.exports = function (arc, cloudformation, stage) {
  const config = arc.slack || [];

  const url = config[0][1]; //TODO: make this better
  const channel = config[1][1];
  const user = config[2][1];

  cloudformation.Resources.lambdaSlackHandler = {
    Type: 'AWS::Serverless::Application',
    Properties: {
      Location: {
        ApplicationId: 'arn:aws:serverlessrepo:us-east-1:488791064862:applications/lambda-slack-handler',
        SemanticVersion: '1.0.1'
      },
      Parameters: {
        SlackChannel: channel,
        SlackUrl: url,
        SlackUsername: user
      }
    }
  };

  return cloudformation;
};
