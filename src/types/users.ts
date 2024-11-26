export type TUserMap = Map<string, IUser>

export interface IUser {
    fullname: string,
    username: string,
}

export interface IRawUser {
    birthdate: number,

    email: string,
    first_name: string,
    gender: string,
    last_name: string,
    phone_number: string,
    title: string,
    username: string,
    location: {
        postcode: number,

        city: string,
        state: string,
        street: string,
    },
}