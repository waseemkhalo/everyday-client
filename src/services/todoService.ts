import { v4 as uuid } from "uuid"

export class Todo {
  constructor(content: string) {
    this.timestamp = new Date()
    this.content = content
    this.completed = false
    this.id = uuid()
  }
  content: string
  completed: boolean
  timestamp: Date
  id: string
}

export const getTodos = (): Todo[] => {
  return []
}

export const addTodo = (todo: Todo) => {
  console.log(todo);

}

export const editTodo = (id: string) => {

}

export const removeTodo = (id: string) => {

}
