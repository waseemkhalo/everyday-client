import { List } from "./userService";

//* TODO object constructor/type definition
export class Todo {
  constructor(content: Todo['content']) {
    this.content = content;
  }
  content: string
  completed: boolean = false;
}

/**
 * @param list title of list to add to
 * @param todo content for new todo
 */
const addTodo = async (list: List['title'], todo: Todo['content']) => {

}
