import { Repository } from "typeorm";
import { z } from "zod";
import { Address, RealEstate } from "../entities";
import { addressSchema, realEstateReqSchema, realEstateSchema, realEstatesSchema } from "../schemas";

export type iAddress = z.infer<typeof addressSchema>
export type iAddressRepo = Repository<Address>
export type iRealEstate = z.infer<typeof realEstateSchema>
export type iRealEstates = z.infer<typeof realEstatesSchema>
export type iRealEstateRequest = z.infer<typeof realEstateReqSchema>
export type iRealRepo = Repository<RealEstate>
