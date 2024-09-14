import ResourceApi from "../api/resourceApi.ts";

const resourceApi = new ResourceApi();

export const getResource = async (path: string) => {
  try {
    return await resourceApi.getResources(path);
  } catch (e) {
    console.error(e);
  }
};
