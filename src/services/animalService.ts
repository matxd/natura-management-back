import IAnimal from "../interfaces/animalInterface";
import animalModel from "../models/animalModel";

const getAnimals = async (): Promise<IAnimal[]> => {
  return await animalModel.getAnimals();
};

const create = async (animal: IAnimal): Promise<IAnimal> => {
  const { insertId } = await animalModel.create(animal);
  animal.id = insertId;
  return animal;
};

const update = async (id: number, animal: IAnimal): Promise<IAnimal> => {
  await animalModel.update(Number(id), animal);
  animal.id = id;
  return animal;
};

const remove = async (id: number): Promise<void> => {
  await animalModel.remove(id);
};

export default { getAnimals, create, update, remove };
