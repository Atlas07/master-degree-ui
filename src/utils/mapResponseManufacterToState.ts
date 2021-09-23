export const mapResponseManufacterToState = (obj: any) => ({
  ...obj,
  manufacturer: obj.manufacturer.name,
});
