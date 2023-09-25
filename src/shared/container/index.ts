import { container } from "tsyringe";
import { RestaurantsRepositoryPrisma } from "../../modules/restaurants/repositories/prisma/RestaurantsRepositoyPrisma";
import { CategoriesRepositoryPrisma } from "../../modules/restaurants/repositories/prisma/CategoriesRepositoryPrisma";
import { ProductsRepositoryPrisma } from "../../modules/restaurants/repositories/prisma/ProductsRepositoryPrisma";
import { SalesRepositoryPrisma } from "../../modules/restaurants/repositories/prisma/SalesRepositoryPrisma";

container.registerSingleton(
	"RestaurantsRepository",
	RestaurantsRepositoryPrisma
);

container.registerSingleton("CategoriesRepository", CategoriesRepositoryPrisma);

container.registerSingleton("ProductsRepository", ProductsRepositoryPrisma);

container.registerSingleton("SalesRepository", SalesRepositoryPrisma);
