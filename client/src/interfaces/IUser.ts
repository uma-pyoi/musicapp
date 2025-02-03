export interface IUser {
	id: number;
	username: string;
	token?: string;
	password?: string;
	role: Role;
}

export enum Role {
	User = 'user',
	Admin = 'admin',
}
