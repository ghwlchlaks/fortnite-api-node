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
