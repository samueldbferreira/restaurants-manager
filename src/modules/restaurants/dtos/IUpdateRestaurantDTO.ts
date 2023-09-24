import { ISchedule } from "../entities/ISchedule";

interface IUpdateRestaurantDTO {
	restaurantId: string;
	photo?: string;
	name?: string;
	address?: string;
	schedule?: ISchedule;
}

export { IUpdateRestaurantDTO };
