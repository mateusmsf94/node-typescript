import express, { Request, Response, NextFunction} from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

app.use(errorHandler);

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ foo: 'bar'});
});

app.listen(3000, () => {
    console.log('Aplicacao executando');
});