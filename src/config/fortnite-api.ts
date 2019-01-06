/* public fortnite api endpoint */
const PfortNiteApiUrl: string = 'https://fortnite-public-api.theapinetwork.com/prod09/';

/* get item */
export const PDailyStore: string = PfortNiteApiUrl + 'store/get';
export const PUpcomingItem: string = PfortNiteApiUrl + 'upcoming/get';
export const PAllItem: string = PfortNiteApiUrl + 'items/list';
export const PSpecItem: string = PfortNiteApiUrl + 'item/get';

/* get user */
export const PgetUserId: string = PfortNiteApiUrl + 'users/id';
export const PgetUserStats: string = PfortNiteApiUrl + 'users/public/br_stats';

/* get challenges */
export const PgetChallenges: string = PfortNiteApiUrl + 'challenges/get';

/* get in-game news */
export const PgetBRNews: string = PfortNiteApiUrl + 'br_motd/get';
