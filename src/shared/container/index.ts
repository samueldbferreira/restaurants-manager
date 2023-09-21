import { container } from "tsyringe";
import { RestaurantsRepositoryPrisma } from "../../modules/restaurants/repositories/prisma/RestaurantsRepositoyPrisma";
import { CategoriesRepositoryPrisma } from "../../modules/restaurants/repositories/prisma/CategoriesRepositoryPrisma";

container.registerSingleton(
	"RestaurantsRepository",
	RestaurantsRepositoryPrisma
);

container.registerSingleton(
	"CategoriesRepository",
	CategoriesRepositoryPrisma
);
