interface ISale {
	id: string;
	title: string;
	description: string;
	discount: number;
	restaurantId: string;
	createdAt: Date;
}

export { ISale };
