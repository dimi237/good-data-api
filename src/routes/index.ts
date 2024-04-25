import express, { Request, Response, NextFunction, Express } from 'express';
import usersRoute from 'modules/users/users.route';
import authRoute from 'modules/auth/auth.route';
import requestRoute from 'modules/requests/request.route';
import paimentRoute from 'modules/paiments/paiements.route';
import programRoute from 'modules/programs/programs.route';
import inscriptionRoute from 'modules/inscriptions/inscriptions.route';
import config from 'convict-config';
// import notificationsRoute from 'modules/notifications/notifications.route';

const routes = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type, x-access-token, authorization"
    );
    // res.setHeader( "Access-Control-Allow-Credentials", true );
    res.removeHeader("X-Powered-By");
    next();
  });
  app.use("/public", express.static(config.get("filePath")));
  app.use("/users", usersRoute);
  app.use("/auth", authRoute);
  app.use("/requests", requestRoute);
  app.use("/pay", paimentRoute);
  app.use("/programs", programRoute);
  app.use("/inscription", inscriptionRoute);
  // app.use("/notify", notificationsRoute);

};

export default routes;
