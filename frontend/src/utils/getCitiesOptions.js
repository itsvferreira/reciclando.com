export function getCitiesOptions(ads) {
  const cities = new Set(ads.map((ad) => ad.city));
  const citiesArray = Array.from(cities);
  const options = citiesArray.map((c) => ({ label: c, value: c }));
  options.sort((city) => city.label);
  return options;
}
