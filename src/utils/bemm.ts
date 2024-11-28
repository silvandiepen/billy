import { useBemm as useBemmFunction } from "bemm";

export const useBemm = (block: string) => {
  return useBemmFunction(block, {
    includeBaseClass: true,
  });
}
