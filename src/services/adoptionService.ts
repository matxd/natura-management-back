import IAdoption from "../interfaces/adoptionInterface";
import adoptionModel from "../models/adoptionModel";

const getAdoptions = (): Promise<IAdoption[]> => {
  return adoptionModel.getAdoptions();
};

const create = async (adoption: IAdoption): Promise<IAdoption> => {
  //validates if person exists
  await adoptionModel.validationPerson(Number(adoption.personId));
  //validates if animal exists
  await adoptionModel.validationAnimal(Number(adoption.animalId));

  const { insertId } = await adoptionModel.create(adoption);
  adoption.id = insertId;
  return adoption;
};

const update = async (id: number, adoption: IAdoption): Promise<IAdoption> => {
  await adoptionModel.update(Number(id), adoption);
  adoption.id = id;
  return adoption;
};

const remove = async (id: number): Promise<void> => {
  await adoptionModel.remove(id);
};

export default { getAdoptions, create, update, remove };
