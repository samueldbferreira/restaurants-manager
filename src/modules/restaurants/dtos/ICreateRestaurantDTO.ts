import { ISchedule } from "../entities/ISchedule";

interface ICreateRestaurantDTO {
	name: string;
	address: string;
	photo?: string;
	schedule: ISchedule;
}

export { ICreateRestaurantDTO };
