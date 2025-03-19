import { Service } from "./Service";

export interface Office {
  id: string;
  name: string;
  address: string;
  workTime: string;
  services: Service[];
}
