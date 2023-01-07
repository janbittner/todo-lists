import { TodoItem } from 'src/todos/entity/todos-item.entity';
import { TodoList } from 'src/todos/entity/todos-list.entity';
import { TodoStatus } from 'src/todos/types';
import { User } from 'src/users/entity/users.entity';

export const users: User[] = [
  {
    id: '1',
    password: 'hugoReyes',
    username: 'hugoReyes',
  },
  {
    id: '2',
    password: 'ragnarLothbrok',
    username: 'ragnarLothbrok',
  },
  {
    id: '3',
    password: 'rickSanchez',
    username: 'rickSanchez',
  },
];

export const todoLists: TodoList[] = [
  { id: 1, title: 'Supermarket', items: [], users: [...users] },
  {
    id: 2,
    title: 'Home depot',
    items: [],
    users: [users[0], users[1], users[2]],
  },
  { id: 3, title: 'Apartment', items: [], users: [users[2]] },
  { id: 4, title: 'Learn', items: [], users: [users[0], users[1]] },
  { id: 5, title: 'Fix', items: [], users: [users[0], users[2]] },
  { id: 6, title: 'Watch', items: [], users: [users[1]] },
  { id: 7, title: 'Call', items: [], users: [...users] },
];

export const todoItems: TodoItem[] = [
  {
    id: 1,
    title: 'bread',
    createdBy: users[0].username,
    list: todoLists[0],
    status: TodoStatus.Active,
    deadline: new Date(Date.now() + 86400),
  },
  {
    id: 2,
    title: 'milk',
    createdBy: users[1].username,
    list: todoLists[0],
    status: TodoStatus.Active,
    deadline: new Date(Date.now() + 86400),
  },
  {
    id: 3,
    title: 'groceries',
    createdBy: users[1].username,
    list: todoLists[0],
    status: TodoStatus.Active,
    deadline: new Date(Date.now() + 86400),
  },
  {
    id: 4,
    title: 'beer',
    createdBy: users[2].username,
    list: todoLists[0],
    status: TodoStatus.Active,
    deadline: new Date(Date.now() + 86400),
  },
  {
    id: 5,
    title: 'very special nails with long name',
    createdBy: users[0].username,
    list: todoLists[1],
    status: TodoStatus.Active,
  },
  {
    id: 6,
    title: 'chain saw',
    createdBy: users[1].username,
    list: todoLists[1],
    status: TodoStatus.Active,
  },
  {
    id: 7,
    title: 'axe',
    createdBy: users[2].username,
    list: todoLists[1],
    status: TodoStatus.Active,
  },
  {
    id: 8,
    title: 'look up for wardrobe',
    createdBy: users[0].username,
    list: todoLists[2],
    status: TodoStatus.Active,
  },
  {
    id: 9,
    title: 'install new lights',
    createdBy: users[2].username,
    list: todoLists[2],
    status: TodoStatus.Active,
  },
  {
    id: 10,
    title: 'Nest.js',
    createdBy: users[0].username,
    list: todoLists[3],
    status: TodoStatus.Active,
  },
  {
    id: 11,
    title: 'Next.js',
    createdBy: users[0].username,
    list: todoLists[3],
    status: TodoStatus.Active,
  },
  {
    id: 12,
    title: 'Vue.js',
    createdBy: users[0].username,
    list: todoLists[3],
    status: TodoStatus.Active,
  },
  {
    id: 13,
    title: 'the world',
    createdBy: users[0].username,
    list: todoLists[4],
    status: TodoStatus.Active,
  },
  {
    id: 14,
    title: 'car wipers',
    createdBy: users[0].username,
    list: todoLists[4],
    status: TodoStatus.Active,
  },
  {
    id: 15,
    title: 'kitchen sink',
    createdBy: users[0].username,
    list: todoLists[4],
    status: TodoStatus.Active,
  },
];
