import { prisma } from "../../../../shared/infra/prisma";
import { RestaurantsRepositoryPrisma } from "../../../restaurants/repositories/prisma/RestaurantsRepositoryPrisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IUser } from "../../entities/IUser";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryPrisma implements IUsersRepository {
	async create(data: ICreateUserDTO): Promise<IUser> {
		const newUser = await prisma.user.create({
			data,
		});

		return newUser;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

	async findById(id: string): Promise<IUser | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async delete(id: string): Promise<void> {
		const restaurants = await prisma.restaurant.findMany({
			where: {
				userId: id,
			},
		});

		const deleteProducts = restaurants.map((r) => {
			return prisma.product.deleteMany({
				where: {
					restaurantId: r.id,
				},
			});
		});

		const deleteCategories = restaurants.map((r) => {
			return prisma.category.deleteMany({
				where: {
					restaurantId: r.id,
				},
			});
		});

		const deleteRestaurants = prisma.restaurant.deleteMany({
			where: {
				userId: id,
			},
		});

		const deleteUser = prisma.user.delete({
			where: {
				id,
			},
		});

		await prisma.$transaction([
			...deleteProducts,
			...deleteCategories,
			deleteRestaurants,
			deleteUser,
		]);

		return;
	}

	async update(data: IUpdateUserDTO): Promise<IUser> {
		const updatedUser = await prisma.user.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
			},
		});

		return updatedUser;
	}
}

export { UsersRepositoryPrisma };
