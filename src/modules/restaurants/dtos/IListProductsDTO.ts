interface IListProductsDTO {
	restaurantId: string;
	categoryId?: string;
	name?: string;
	sort?: "asc" | "desc";
}

export { IListProductsDTO };
