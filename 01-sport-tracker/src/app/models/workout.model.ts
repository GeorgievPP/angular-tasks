export interface BaseWorkout {
  workout: string;
  location: string;
  date: string;
}

export interface Workout extends BaseWorkout {
  _id: string;
}

export type NewWorkout = BaseWorkout;
