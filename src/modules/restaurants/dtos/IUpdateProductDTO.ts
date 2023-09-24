interface IUpdateProductDTO {
	productId: string;
	photo?: string;
	name?: string;
	price?: number;
	categoryId?: string;
	restaurantId: string;
}

export { IUpdateProductDTO };
