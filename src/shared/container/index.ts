import { container } from "tsyringe";
import { RestaurantsRepositoryPrisma } from "../../modules/restaurants/repositories/prisma/RestaurantsRepositoyPrisma";

container.registerSingleton(
	"RestaurantsRepository",
	RestaurantsRepositoryPrisma
);
