const ProductUtils = {
  getbpMasterdata(fullData) {
    const wareBusiness = fullData ?? {};
    const floors = wareBusiness.floors ?? [];
    for (let index = 0; index < floors.length; index++) {
      const element = floors[index];
      if (element.mId === 'bpMasterdata') {
        return element;
      }
    }
    return {};
  },
  getFloorDataByMid(fullData, mId) {
    const wareBusiness = fullData ?? {};
    const floors = wareBusiness.floors ?? [];
    for (let index = 0; index < floors.length; index++) {
      const element = floors[index];
      if (element.mId === mId) {
        return element;
      }
    }
    return {};
  },
};

export {ProductUtils};
