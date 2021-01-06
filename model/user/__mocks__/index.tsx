/** @format */

import { user } from "./user.data";

export const useUser = jest.fn(() => ({
  getUserSafe: () => user,
}));
