export interface IList {
   id: string;
   title: string;
   users: IUser[];
   items: IItem[];
}

export interface IItem {
   id: number;
   title: string;
   description: string;
   createdBy: string;
   deadline?: Date;
   status: TodoStatus;
   list: IList;
}

export interface IUser {
   id: string;
   username: string;
   lists: IList[];
}

export enum TodoStatus {
   Active = 'ACTIVE',
   Finished = 'FINISHED',
   Cancelled = 'CANCELLED',
}
