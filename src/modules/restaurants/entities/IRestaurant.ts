import { ISchedule } from "./ISchedule";

interface IRestaurant {
	id: string;
	name: string;
	address: string;
	photo: string | null;
	schedule: ISchedule;
	createdAt: Date;
}

export { IRestaurant };
