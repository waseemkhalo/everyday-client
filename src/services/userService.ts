import { User } from "firebase/auth";
import { addDefaultLists } from "./listService";

/** @param userId User.uid from auth */
export const addUser = async (userId: User['uid']) => {
  try {
    await addDefaultLists(userId)
  } catch (e) {
    console.error('error adding user: ', e);
  }
}
