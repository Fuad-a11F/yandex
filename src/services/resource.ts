import ResourceApi from "../api/resourceApi.ts";

const resourceApi = new ResourceApi();

export const getResource = async (path: string) => {
  try {
    const response = await resourceApi.getResources(path);
    return response;
  } catch (e) {
    console.error(e);
  }
};
