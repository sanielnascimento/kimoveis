import { AppDataSource } from "../data-source";
import { Schedule, User, RealEstate } from "../entities";
import { AppError } from "../errors";
import {
  iRealRepo,
  iUserRepo,
  iScheduleRepo,
  iScheduleRequest,
} from "../interfaces";

const create = async (schedBody: iScheduleRequest, userId: number): Promise<any> => {
  const ScheduleRepo: iScheduleRepo = AppDataSource.getRepository(Schedule);
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const realRepo: iRealRepo = AppDataSource.getRepository(RealEstate);

  const schedQuery = ScheduleRepo.createQueryBuilder("schedules");

  const data = new Date(`${schedBody.date} ${schedBody.hour}`);
  const day = data.getDay();
  const hour = data.getHours();

  const realEstate: RealEstate | null = await realRepo.findOne({ where: { id: schedBody.realEstateId }});
  const user: User | null = await userRepo.findOne({ where: { id: userId } });

  if (!realEstate) throw new AppError("RealEstate not found", 404);

  if (hour < 7 || hour > 18) throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  if (day === 0 || day === 6) throw new AppError("Invalid date, work days are monday to friday", 400);

  const realSchedule: Schedule | null = await schedQuery
    .select("schedules")
    .where("schedules.date = :date", { date: schedBody.date })
    .andWhere("schedules.hour = :hour", { hour: schedBody.hour })
    .andWhere("schedules.realEstateId = :realEstateId", { realEstateId: schedBody.realEstateId })
    .getOne();

  if (realSchedule) throw new AppError("Schedule to this real estate at this date and time already exists", 409);

  const userSchedule: Schedule | null = await schedQuery
    .select("schedules")
    .where("schedules.date = :date", { date: schedBody.date })
    .andWhere("schedules.hour = :hour", { hour: schedBody.hour })
    .andWhere("schedules.user = :user", { user: userId })
    .getOne();

  if (userSchedule) throw new AppError("User schedule to this real estate at this date and time already exists", 409);

  const newSchedule = ScheduleRepo.create({...schedBody, user: user!, realEstate: realEstate});

  await ScheduleRepo.save(newSchedule);

  return { message: "Schedule created" };
};


const readByRealEstate = async (realId: number): Promise<RealEstate> => {
  const realRepo: iRealRepo = AppDataSource.getRepository(RealEstate);

  const realState: RealEstate | null = await realRepo.findOne({
    where: { id: realId },
    relations: { address: true, category: true, schedules: {user:true} },
  });

  if (!realState) throw new AppError("RealEstate not found", 404);

  return realState;
};

export default { create, readByRealEstate };
