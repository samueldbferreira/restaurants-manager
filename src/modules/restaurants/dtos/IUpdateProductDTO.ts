interface IUpdateProductDTO {
	productId: string;
	photo?: string;
	name?: string;
	price?: number;
	categoryId?: string;
}

export { IUpdateProductDTO };
