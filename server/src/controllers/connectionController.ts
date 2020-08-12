import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionController{
    async index(request: Request, response: Response) {
        const connections = await db('connections').count('* as total');

        console.log(connections);

        const { total } = connections[0];

        return response.json({ total });
    }

    async create(request: Request, response: Response) {
        const { user_id } = request.body;

        await db('connections').insert({ user_id });
        return response.status(201).send();
    }
}
