import axios, {AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';

import * as PfortNiteApi from '../config/fortnite-api';
import fortniteModel, { IUserStatsModel } from '../models/fortniteModel';
import { IGetUserId, IGetUserStats } from '../types/fortnite-types';

export let getUserId = (req: Request, res: Response) => {
    const userId: string = req.query.userId;

    const main = async () => {
        const data: IGetUserId = await callGetUserIdApi(userId);
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

const callGetUserIdApi = async (userId: string): Promise<IGetUserId>  => {
    let result: Promise<IGetUserId>;
    return await axios.get(PfortNiteApi.PgetUserId, {
        params: {
            username: userId,
        },
    }).then((response: AxiosResponse) => {
        result = response.data;
        if (response.data && response.status >= 200 && response.status < 300) {
            return result;
        } else {
            return null;
        }
    }).catch((error: AxiosError) => {
        console.error(error);
        return result;
    });
};

const callGetUserStatsApi = async (id: string, plat: string): Promise<IGetUserStats> => {
    let result: Promise<IGetUserStats>;
    return await axios.get(PfortNiteApi.PgetUserStats, {
        params: {
            platform: plat,
            user_id: id,
        },
    }).then((response: AxiosResponse) => {
        if (response.data && response.status >= 200 && response.status < 300) {
            result = response.data;
            return result;
        } else {
            return null;
        }
    }).catch((error: AxiosError) => {
        console.error(error);
        return result;
    });
};

export let getUserStats = (req: Request, res: Response) => {
    const userId: string = req.query.userId;
    const platform: string = req.query.platform;
    console.log(userId);
    const main = async () => {

        // id 검사
        const checkId = await fortniteModel.findOne({username: {$regex: userId, $options: 'i'}});
        console.log(checkId);
        let userIdApiData;
        let userStatsApiData;

        if (checkId) {
            // id 존재 할 떄
            // 3분
            const checkTime = await fortniteModel.findOne({lastupdate : {$lte: (Date.now() - ( 1 * 60 * 1000 ))}});
            console.log('2');
            if (!checkTime) {
                // 시간안에 요청시
                // db값 주기
                console.log('3');
                return checkId;
            } else {
                // 시간 밖에 요청시
                // api 이용
                console.log('4');
                userIdApiData = await callGetUserIdApi(userId);
                console.log('5');
                userStatsApiData = await callGetUserStatsApi(userIdApiData.uid, platform);
                // db 갱신 및 현재시간 저장
                console.log('6');
                return updateStats(userIdApiData, userStatsApiData);
            }
        } else {
            // id 존재 안 할 때
            // api 이용
            console.log('7');
            userIdApiData = await callGetUserIdApi(userId);
            console.log('8');
            userStatsApiData = await callGetUserStatsApi(userIdApiData.uid, platform);
            // db 생성
            console.log('9');
            return createStats(userIdApiData, userStatsApiData);
        }
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
const updateStats = (userIdApiData: IGetUserId , userStatsApiData: IGetUserStats) => {
    const currentTime = { lastupdate : Date.now()};
    console.log('10');
    const mergeData = Object.assign(userIdApiData, userStatsApiData, currentTime);
    console.log('11');
    return fortniteModel.updateOne({uid : userIdApiData.uid}, {$set : mergeData});
};

const createStats = (userIdApiData: IGetUserId , userStatsApiData: IGetUserStats) => {
    console.log('12');
    const mergeData = Object.assign(userIdApiData, userStatsApiData);
    console.log('13');
    const fortnite = new fortniteModel(mergeData);
    return fortnite.save();
};
