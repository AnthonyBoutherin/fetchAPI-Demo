document.addEventListener("DOMContentLoaded", async function () {
  /**
   * Charge la liste des pays depuis une API.
   * @returns {array} la liste des pays
   */
  async function getCountries() {
    try {
      const reponse = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags"
      );
      const countries = await reponse.json();

      const countriesList = [];
      for (const countryFromCountries of countries) {
        const country = {
          name: countryFromCountries.name.common,
          flag: countryFromCountries.flags.svg,
        };
        countriesList.push(country);
      }
      return countriesList;
    } catch (erreur) {
      console.error(
        "Une erreur s'est produite lors de la récupération des pays :",
        erreur
      );
      // return []; évite de crash l'application si erreur
      return [];
    }
  }

  /**
   * Créer les différents éléments du DOM nécessaire aux listings des pays
   * @param {array} countriesToLoad
   */
  async function loadCountries(countriesToLoad) {
    const ul = document.querySelector(".ul");

    countriesToLoad.forEach((element) => {
      const countryName = element.name;
      const countryFlag = element.flag;
      console.log(countryName);
      console.log(countryFlag);

      const li = document.createElement("li");
      const span = document.createElement("span");
      const img = document.createElement("img");

      span.textContent = `${countryName}`;
      img.src = countryFlag;
      img.alt = `${countryName}`;

      li.append(span);
      li.append(img);
      ul.append(li);
    });
  }

  const countriesToLoad = await getCountries();
  /**
   * Initialise le chargement des pays dans le DOM
   */
  await loadCountries(countriesToLoad);
});
