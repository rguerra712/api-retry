'use strict';

module.exports.isSuccessfulStatusCode = response => {
    if (!response || !response.status) return false;
    const statusCode = response.status;
    if (isNaN(statusCode)) return false;
    const statusCodeCategory = Math.floor(statusCode / 100);
    return statusCodeCategory === 2 || statusCodeCategory === 3;
}