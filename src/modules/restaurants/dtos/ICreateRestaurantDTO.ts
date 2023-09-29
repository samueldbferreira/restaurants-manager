import { ISchedule } from "../entities/ISchedule";

interface ICreateRestaurantDTO {
	name: string;
	address: string;
	photo?: string;
	schedule: ISchedule;
	userId: string;
}

export { ICreateRestaurantDTO };
