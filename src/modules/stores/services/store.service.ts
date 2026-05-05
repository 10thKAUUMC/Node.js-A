import * as storeRepo from "../repositories/store.repository.js";

export const createStore = async (regionId: number, name: string) => {
  const storeId = await storeRepo.addStore(regionId, name);
  return { id: storeId, regionId, name };
};

export const createReview = async (storeId: number, data: any) => {
  const isExist = await storeRepo.confirmStore(storeId);
  if (!isExist) throw new Error("해당 가게가 존재하지 않습니다.");
  
  const reviewId = await storeRepo.addReview(storeId, data);
  return { id: reviewId, ...data };
};