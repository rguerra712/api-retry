'use strict';
const fetch = require('node-fetch');
const statusCodeChecker = require('./lib/status-code-checker');

module.exports.tryRequest = async (event, context, stuff) => {
  const url = event.url;
  if (!url) {
    throw new Error('url is a required property');
  }

  const response = await fetch(url, {
    method: 'POST',
    body: event.body
  });

  if (statusCodeChecker.isSuccessfulStatusCode(response))
  {
    const unsuccessfulStatusCodeMessage = `Unsuccessful status code ${response.status}`;
    throw new Error(unsuccessfulStatusCodeMessage);
  }
  
  const successfulStatusCodeMessage = 'Request completed successfully!';
  return {
    message: successfulStatusCodeMessage,
    requestSucceeded: true,
    event,
  };
};