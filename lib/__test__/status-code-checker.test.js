'use strict';

const statusCodeChecker = require('../../lib/status-code-checker');

test.each([200, 201, 202, 204, 301, 302, 308])('successful status codes should be true', statusCode => {
    // Arrange
    const response = { status: statusCode };
    
    // Act
    const isSuccessful = statusCodeChecker.isSuccessfulStatusCode(response);

    // Assert
    expect(isSuccessful).toBe(true, 'successul response codes should be true for successful');
});

test.each([400, 401, 403, 404, 409, 412, 418, 422, 500, 501, 502, 503, 504])('unsuccessful status codes should be false', statusCode => {
    // Arrange
    const response = {
        status: statusCode
    };

    // Act
    const isSuccessful = statusCodeChecker.isSuccessfulStatusCode(response);

    // Assert
    expect(isSuccessful).toBe(false, 'unsuccessul response codes should be false for successful');
});

test('null response should be false', () => {
    // Arrange
    const response = null;

    // Act
    const isSuccessful = statusCodeChecker.isSuccessfulStatusCode(response);

    // Assert
    expect(isSuccessful).toBe(false, 'null response should be false for successful');
});

test('null statusCode should be false', () => {
    // Arrange
    const response = {};

    // Act
    const isSuccessful = statusCodeChecker.isSuccessfulStatusCode(response);

    // Assert
    expect(isSuccessful).toBe(false, 'null response status codes should be false for successful');
});

test('non-numeric statusCode should be false', () => {
    // Arrange
    const response = { status: 'hi' };

    // Act
    const isSuccessful = statusCodeChecker.isSuccessfulStatusCode(response);

    // Assert
    expect(isSuccessful).toBe(false, 'non-numeric response codes should be false for successful');
});