export interface IUser {
	id: number;
	username: string;
	token?: string;
	password?: string;
	role: string;
}

// todo:: add roles later

// export enum Role {
// 	User = 'user',
// 	Admin = 'admin',
// }
