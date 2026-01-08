import { Category, Team, Urgency } from "./enums";

export interface Problem {
  id: number;
  employee: string;
  category: Category;
  urgency: Urgency;
  team: Team;
  description: string;
}
