import { Admin } from "./Admin";
import { Coach } from "./Coach";
import { FileDB } from "./FileDB";
import { Manager } from "./Manager";
import { Player } from "./Player";
import { Role } from "./Role";
import { Sponsor } from "./Sponsor";

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  enable: boolean;
  image: FileDB;
  roles: Role[];

 
}