import * as mongoose from 'mongoose';
import * as fortniteTypes from '../types/fortnite-types';

export const userStatsSchema = new mongoose.Schema({
    platforms: {type: Array},
    seasons: {type: Array},

    cached: {type: Boolean},
    uid: {type: String, required: true},
    username: {type: String, required: true},
    platform: {type: String, required: true},
    timestamp: {type: Date, required: true},
    window: {type: String, required: true},
    stats: {
        kills_solo: {type: Number},
        placetop1_solo: {type: Number},
        placetop10_solo: {type: Number},
        placetop25_solo: {type: Number},
        matchesplayed_solo: {type: Number},
        kd_solo: {type: Number},
        winrate_solo: {type: Number},
        score_solo: {type: Number},
        minutesplayed_solo: {type: Number},
        lastmodified_solo: {type: Date},
        kills_duo: {type: Number},
        placetop1_duo: {type: Number},
        placetop5_duo: {type: Number},
        placetop12_duo: {type: Number},
        matchesplayed_duo: {type: Number},
        kd_duo: {type: Number},
        winrate_duo: {type: Number},
        score_duo: {type: Number},
        minutesplayed_duo: {type: Number},
        lastmodified_duo: {type: Date},
        kills_squad: {type: Number},
        placetop1_squad: {type: Number},
        placetop3_squad: {type: Number},
        placetop6_squad: {type: Number},
        matchesplayed_squad: {type: Number},
        kd_squad: {type: Number},
        winrate_squad: {type: Number},
        score_squad: {type: Number},
        minutesplayed_squad: {type: Number},
        lastmodified_squad: {type: Date},
    },
    totals: {
        kills: {type: Number},
        wins: {type: Number},
        matchesplayed:  {type: Number},
        minutesplayed:  {type: Number},
        hoursplayed:  {type: Number},
        score:  {type: Number},
        winrate:  {type: Number},
        kd: {type: Number},
        lastupdate: {type: Date},
    },
    lastupdate: {type: Date, required: true, default: Date.now},
});

export interface IUserStatsModel extends fortniteTypes.IGetUserId, fortniteTypes.IGetUserStats, mongoose.Document {
    lastupdate: Date;
}

export const userStats: mongoose.Model<IUserStatsModel> = mongoose.model<IUserStatsModel>('userStats', userStatsSchema);
export default userStats;
