import { Admin } from "./Admin";
import { Coach } from "./Coach";
import { Manager } from "./Manager";
import { Player } from "./Player";
import { Sponsor } from "./Sponsor";

export class User {
    idUser?: number;  
    password?: string;
    role?: string;
    email?: string;
    enabled?:Boolean;
    Coach?:Coach;
    Player?:Player;
    Manager?:Manager;
    Sponsor?:Sponsor;
    admin?:Admin;
  }