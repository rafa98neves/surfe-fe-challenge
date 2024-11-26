import { IRawUser, IUser, TUserMap } from "../types/users";

export function parseUserResponse(response: IRawUser[]): TUserMap {
    return response.reduce((userMap, rawUser) => {
        userMap.set(rawUser.username, {
            fullname: `${rawUser.first_name} ${rawUser.last_name}`,
            username: rawUser.username
        });
        return userMap;
    }, new Map<string, IUser>());
}
