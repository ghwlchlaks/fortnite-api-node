import axios, {AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';

import * as PfortNiteApi from '../config/fortnite-api';
import { IGetUserId, IGetUserStats } from '../types/fortnite-types';

export let index = (req: Request, res: Response) => {
    res.send('Hello!');
};

export let getUserId = (req: Request, res: Response) => {
    const userId: string = req.query.userId;

    const main = async () => {
        const data: IGetUserId | void = await callGetUserIdApi(userId);
        return data;
    };

    main().then((result: any) => {
        if (result) {
            res.send(result);
        } else {
            res.send(null);
        }
    }).catch((err) => {
        console.error(err);
    });
};

const callGetUserIdApi = async (userId: string) => {
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

export let getUserStats = (req: Request, res: Response) => {
    const userId: string = req.query.userId;
    const platform: string = req.query.platform;

    const main = async () => {
        const data: IGetUserId | void = await callGetUserIdApi(userId);
        let data1: IGetUserStats | void  = null;
        if (data) {
            data1 = await callGetUserStatsApi(data.uid, platform);
        }
        return data1;
    };

    main().then((result: any) => {
        if (result) {
            res.send(result);
        } else {
            res.send(null);
        }
    }).catch((err) => {
        console.error(err);
    });
};

const callGetUserStatsApi = async (id: string, plat: string) => {
    return await axios.get(PfortNiteApi.PgetUserStats, {
        params: {
            platform: plat,
            user_id: id,
        },
    }).then((response: AxiosResponse) => {
        if (response.data && response.status >= 200 && response.status < 300) {
            const result: IGetUserStats = response.data;
            return result;
        } else {
            return null;
        }
    }).catch((error: AxiosError) => {
        console.error(error);
    });
};
