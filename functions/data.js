const entreprises = [
  {
    "nom": "LVMH",
    "valeurs_boursieres": []
  },
  {
    "nom": "Eiffage",
    "valeurs_boursieres": []
  },
  {
    "nom": "Vinci",
    "valeurs_boursieres": []
  },
  {
    "nom": "Airbus",
    "valeurs_boursieres": []
  },
  {
    "nom": "TotalEnergies",
    "valeurs_boursieres": []
  },
  {
    "nom": "Carrefour",
    "valeurs_boursieres": []
  },
  {
    "nom": "Thales",
    "valeurs_boursieres": []
  }
];

const selectElement = document.getElementById('entreprise-select');

entreprises.forEach(entreprise => {
  const option = document.createElement('option');
  option.textContent = entreprise.nom;
  option.value = entreprise.nom;
  selectElement.appendChild(option);
});