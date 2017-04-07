export class Task implements ITask {
  constructor (public id: string|number,
               public summary: string,
               public description: string,
               public date: number | Date,
               public status: Status) {

  }
}
