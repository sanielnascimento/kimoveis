import { AppDataSource } from "../data-source";
import { RealEstate, Address, Category } from "../entities";
import { AppError } from "../errors";
import { iCatRepo, iRealEstates, iRealRepo } from "../interfaces";
import { iAddressRepo, iRealEstateRequest } from "../interfaces";
import { realEstatesSchema } from "../schemas";

const create = async (realData: iRealEstateRequest): Promise<RealEstate> => {
  const realRepo: iRealRepo = AppDataSource.getRepository(RealEstate);
  const addressRepo: iAddressRepo = AppDataSource.getRepository(Address);
  const categoryRepo: iCatRepo = AppDataSource.getRepository(Category);

  const duplicatedAddress = await addressRepo.findOne({
    where: { street: realData.address.street, zipCode: realData.address.zipCode },
  });

  if (duplicatedAddress) throw new AppError("Address already exists", 409);

  const address: Address = await addressRepo.save(addressRepo.create(realData.address));

  const category: Category | null = await categoryRepo.findOneBy({
    id: Number(realData.categoryId),
  });

  const realEstate = realRepo.create({...realData, address: address!, category: category!});

  return await realRepo.save(realEstate);
};


const read = async (): Promise<iRealEstates> => {
  const realRepo: iRealRepo = AppDataSource.getRepository(RealEstate);
  const realEstates: RealEstate[] = await realRepo.find({relations: { address: true }});

  return realEstatesSchema.parse(realEstates);
};

export default { create, read };
