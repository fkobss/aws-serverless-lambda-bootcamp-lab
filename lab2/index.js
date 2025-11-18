export const handler = async (event, context) => {
  const appName = process.env.APP_NAME || 'undefined';
  const appVersion = process.env.APP_VERSION || 'undefined';

  let eventType = 'Unknown';
  if (event?.Records?.[0]?.eventSource === 'aws:s3') {
    eventType = 'S3';
  } else if (event?.httpMethod) {
    eventType = 'APIGateway';
  }

  console.log('APP_NAME:', appName);
  console.log('APP_VERSION:', appVersion);
  console.log('Event Type:', eventType);
  console.log('Event Raw:', JSON.stringify(event));
  console.log('Request ID:', context.awsRequestId);
  console.log('Remaining ms:', context.getRemainingTimeInMillis());

  return {
    eventType,
    appName,
    appVersion,
    requestId: context.awsRequestId
  };
};
