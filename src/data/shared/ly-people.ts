import type { Person } from "../schema";
import { lyEarlyPeople } from "./ly-early-people";
import { lyLatePeople } from "./ly-late-people";

export const lyPeople: Person[] = [...lyEarlyPeople, ...lyLatePeople];
