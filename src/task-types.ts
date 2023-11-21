export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
