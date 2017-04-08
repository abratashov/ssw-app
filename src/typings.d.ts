declare type Status = 'todo' | 'doing' | 'done';

declare interface ITask {
    id: string | number;
    summary: string;
    description: string;
    status: Status;
    date: number | Date;
}

declare type FormAction = 'create' | 'update';

declare module '*.html' {
    const content: string;
    export default content;
}