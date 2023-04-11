enum TodoStatus {
    Done = "done",
    InProgress = "in-progress",
    Todo = "todo",
}

interface TodoItem {
    id: number;
    title: string;
    status: TodoStatus;
    completedOn?: Date;
}

const todoItems: TodoItem[] = [
    {id: 1, title: "Learn HTML", status: TodoStatus.Done, completedOn: new Date("2021-09-11")},
    {id: 2, title: "Learn TypeScript", status: TodoStatus.InProgress},
    {id: 3, title: "Write the best app in the world", status: TodoStatus.Todo},
];


function addTodoItem(todo: string): TodoItem {
    const id = getNextId(todoItems);

    const newTodo = {
        id,
        title: todo,
        status: TodoStatus.Todo,
    };

    todoItems.push(newTodo);

    return newTodo;
}

function getNextId<T extends { id: number }>(items: T[]): number {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1;
}

const newTodo = addTodoItem("Invest part of the profit in Green Energy");

console.log(JSON.stringify(newTodo));
