type Action = "add" | "edit" | "list" | "delete"
type Status = "todo" | "in-progress" | "done"
type Task = {
  id: number,
  description: string,
  status: Status,
  createdAt: Date,
  updatedAt: Date,
}
type JSONContent = {
  tasks: Task[]
}

export { Action, Status, Task, JSONContent }