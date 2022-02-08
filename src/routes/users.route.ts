import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes'
import usersRepository from "../repositories/users.repository";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next:NextFunction) => {
    
    console.log(req.headers['authorization']);
    
    const users = await usersRepository.findAllUsers();
    res.status(StatusCodes.OK).send({users});
});

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await usersRepository.findById(uuid)
        res.status(StatusCodes.OK).send(user);

    } catch (error) {
        next(error);
    }
    
})

usersRoute.post('/users', async (req: Request, res: Response, next:NextFunction) => {
    const newUser = req.body;
    const uuid = await usersRepository.create(newUser)
    
    res.status(StatusCodes.CREATED).send(uuid);
})

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    await usersRepository.update(modifiedUser);

    res.status(StatusCodes.OK).send();
});

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await usersRepository.remove(uuid);
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;