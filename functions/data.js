const entreprises = [
  {
    "nom": "LVMH",
    "nombre_actions": 1, 
    "valeurs_boursieres": [853.18, 839.60, 828.10, 833.10, 839.80] // inclus les frais estimés
  },
  {
    "nom": "Eiffage",
    "nombre_actions": 1,
    "valeurs_boursieres": [100.7, 99.05, 101.05, 101.65, 103.90]
  },
  {
    "nom": "Vinci",
    "nombre_actions": 1,
    "valeurs_boursieres": [118.24, 117.18, 117.64, 117.28, 118.88]
  },
  {
    "nom": "Airbus",
    "nombre_actions": 1,
    "valeurs_boursieres": [153.41, 155.2, 157.58, 158.18, 158.34]
  },
  {
    "nom": "TotalEnergies",
    "nombre_actions": 10,
    "valeurs_boursieres": [60.28, 59.40, 59.10, 59.98, 59.92]
  },
  {
    "nom": "Carrefour",
    "nombre_actions": 10,
    "valeurs_boursieres": [15.48, 15.45, 15.74, 15.74, 15.57]
  },
  {
    "nom": "Thales",
    "nombre_actions": 5,
    "valeurs_boursieres": [146.97, 137.80, 150.70, 147.05, 145.90]
  }
];

const selectElement = document.getElementById('entreprise-select');

entreprises.forEach(entreprise => {
  const option = document.createElement('option');
  option.textContent = entreprise.nom;
  option.value = entreprise.nom;
  selectElement.appendChild(option);
});

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('graphique');
  const ctx = canvas.getContext('2d');

  let entrepriseSelected = entreprises[0]; 
  selectElement.value = entrepriseSelected.nom;

  generateChart();

  selectElement.addEventListener('change', function(event) {
      entrepriseSelected = entreprises.find(entreprise => entreprise.nom === event.target.value);
      if (entrepriseSelected) {
          generateChart(); 
      }
  });

  function generateChart() {
    if (!entrepriseSelected) return;

    if (window.myChart) {
        window.myChart.destroy();
    }

    const q1 = entrepriseSelected.valeurs_boursieres[0]; // Première valeur
    const q4 = entrepriseSelected.valeurs_boursieres[entrepriseSelected.valeurs_boursieres.length - 1]; // Dernière valeur
    const q2 = q1 + (q4 - q1) / 3; // Un tiers du chemin de q1 à q4
    const q3 = q1 + 2 * (q4 - q1) / 3; // Deux tiers du chemin de q1 à q4

    const labels = ['q1', 'q2', 'q3', 'q4'];
    const data = [q1, q2, q3, q4];
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Prix de l\'action (en euros)',
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    min: minValue - minValue * 0.05,
                    max: maxValue + maxValue * 0.05
                }
            }
        }
    });
}

});
