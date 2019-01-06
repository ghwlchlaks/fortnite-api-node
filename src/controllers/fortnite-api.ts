import axios, {AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';

import * as PfortNiteApi from '../config/fortnite-api';
import { IGetUserId } from '../types/fortnite-types';

export let index = (req: Request, res: Response) => {
    res.send('Hello!');
};

export let getUserId = (req: Request, res: Response) => {
    const userId: string = req.query.userId;

    const main = async () => {
        const data: IGetUserId | void = await callApi(userId);
        return data;
    };

    main().then((result) => {
        res.send(result);
    });

};

const callApi = async (userId: string) => {
    return await axios.get(PfortNiteApi.PgetUserId, {
        params: {
            username: userId,
        },
    }).then((response: AxiosResponse) => {
        if (response.data && response.status >= 200 && response.status < 300) {
            const result: IGetUserId = response.data;
            return result;
        } else {
            return null;
        }
    }).catch((error: AxiosError) => {
        console.error(error);
    });
};
