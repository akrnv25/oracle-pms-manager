const oracleAuthService = require('../services/oracle-auth.service');
const storageKeys = require('../consts/storage-keys');
const storageService = require('../services/storage.service');

const authMiddleware = (req, res, next) => {
  const token = storageService.getItem(storageKeys.TOKEN);
  const tokenType = storageService.getItem(storageKeys.TOKEN_TYPE);
  const tokenExpirationTimestamp = storageService.getItem(storageKeys.TOKEN_EXPIRATION_TIMESTAMP);
  const tokenExists = !!token && !!tokenExpirationTimestamp && !!tokenType;
  const tokenExpired = tokenExpirationTimestamp < Date.now();
  if (tokenExists && !tokenExpired) {
    next();
  } else {
    oracleAuthService
      .getTokens()
      .then(successRes => {
        const newToken = successRes?.data?.['access_token'];
        storageService.setItem(storageKeys.TOKEN, newToken);
        const newTokenType = successRes?.data?.['token_type'];
        storageService.setItem(storageKeys.TOKEN_TYPE, newTokenType);
        const newTokenExpiresIn = successRes?.data?.['expires_in'];
        // shift the life of the token by 5 minutes to form a reserve for maneuvers
        const newTokenExpirationTimestamp = Date.now() + newTokenExpiresIn * 1000 - 300000;
        storageService.setItem(storageKeys.TOKEN_EXPIRATION_TIMESTAMP, newTokenExpirationTimestamp);
        next();
      })
      .catch(failedRes => {
        res.status(400).json(failedRes);
      });
  }
};

module.exports = authMiddleware;
