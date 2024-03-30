import { Contratplayer } from "./Contratplayer";
import { User } from "./User";

export class Player {
  id: number;
  fullName: string;
  dateOfBirth: Date;
  mailAddress: string;
  discordId: number;
  whatsappPhoneNumber: number;
  inGameName: string;
  salary: number;
  contractStart: Date;
  contractEnd: Date;
  countryOfResidence: string;
  jerseySize: string;
  socialMediaLinkFollowers: string;
  contratplayer: Contratplayer;
  user: User;
}