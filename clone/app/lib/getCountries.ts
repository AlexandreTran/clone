import countries from "world-countries";

const countriesFormated = countries.map((item) => ({
  value: item.cca2,
  label: item.name.common,
  flag: item.flag,
  latLang: item.latlng,
  region: item.region,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesFormated;

  const getCountryByValue = (value: string) => {
    return countriesFormated.find((item) => item.value === value);
  };

  return {
    getAllCountries,
    getCountryByValue,
  };
};
