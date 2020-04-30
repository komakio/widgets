import { h } from 'preact';

interface TodoItemProps {
  text: string;
}

const TodoItem = ({text}: TodoItemProps) => (<li data-cy="todo-item">{text}qwdqw</li>);

export default TodoItem;
