import { v4 as uuid } from "uuid";
import { IRestaurant } from "../IRestaurant";
import { ISchedule } from "../ISchedule";

interface IConstructor {
	id?: string;
	name: string;
	address: string;
	photo?: string;
	schedule: ISchedule;
	createdAt?: Date;
}

class Restaurant implements IRestaurant {
	id: string;
	name: string;
	address: string;
	photo: string | null;
	schedule: ISchedule;
	createdAt: Date;

	constructor(data: IConstructor) {
		if (data.id) {
			this.id = data.id;
		} else {
			this.id = uuid();
		}

		if (data.createdAt) {
			this.createdAt = data.createdAt;
		} else {
			this.createdAt = new Date();
		}

		this.name = data.name;
		this.address = data.address;
		this.photo = data.photo || null;
		this.schedule = data.schedule;
	}
}

export { Restaurant };
