
export interface IGetUserId {
    uid: string;
    username: string;
    platforms: [IPlatform];
    seasons: [ISeason];
}

interface IPlatform {
    name: string;
}
interface ISeason {
    name: string;
}

export interface IGetUserStats {
    cached: boolean;
    uid: string;
    username: string;
    platform: string;
    timestamp: Date;
    window: string;
    stats: [Istat];
    totals: [Itotal];
}
interface Istat {
    kills_solo: number;
    placetop1_solo: number;
    placetop10_solo: number;
    placetop25_solo: number;
    matchesplayed_solo: number;
    kd_solo: number;
    winrate_solo: number;
    score_solo: number;
    minutesplayed_solo: number;
    lastmodified_solo: Date;
    kills_duo: number;
    placetop1_duo: number;
    placetop5_duo: number;
    placetop12_duo: number;
    matchesplayed_duo: number;
    kd_duo: number;
    winrate_duo: number;
    score_duo: number;
    minutesplayed_duo: number;
    lastmodified_duo: Date;
    kills_squad: number;
    placetop1_squad: number;
    placetop3_squad: number;
    placetop6_squad: number;
    matchesplayed_squad: number;
    kd_squad: number;
    winrate_squad: number;
    score_squad: number;
    minutesplayed_squad: number;
    lastmodified_squad: Date;
}
interface Itotal {
    kills: number;
    wins: number;
    matchesplayed: number;
    minutesplayed: number;
    hoursplayed: number;
    score: number;
    winrate: number;
    kd: number;
    lastupdate: Date;
}
