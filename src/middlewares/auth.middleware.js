const parseAuthGuard = (req, res, next) => {
  req


  const sessionToken = request.header('X-Parse-Session-Token');
  getCurrentUser(sessionToken)
    .then(successResponse => {
      storageService.setItem(CURRENT_USER_KEY, successResponse.data);
      storageService.setItem(SESSION_TOKEN, sessionToken);
      next();
    })
    .catch(failedResponse => {
      response.status(400).send(failedResponse);
    });
};
