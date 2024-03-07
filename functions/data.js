const entreprises = [
  {
    "nom": "LVMH",
    "nombre_actions": 1, 
    "valeurs_boursieres": [853.18, 839.80] // inclus les frais estimés
  },
  {
    "nom": "Eiffage",
    "nombre_actions": 1,
    "valeurs_boursieres": [100.7, 103.90]
  },
  {
    "nom": "Vinci",
    "nombre_actions": 1,
    "valeurs_boursieres": [118.24, 118.88]
  },
  {
    "nom": "Airbus",
    "nombre_actions": 1,
    "valeurs_boursieres": [153.41, 158.34]
  },
  {
    "nom": "TotalEnergies",
    "nombre_actions": 10,
    "valeurs_boursieres": [60.28, 59.92]
  },
  {
    "nom": "Carrefour",
    "nombre_actions": 10,
    "valeurs_boursieres": [15.48, 15.57]
  },
  {
    "nom": "Thales",
    "nombre_actions": 5,
    "valeurs_boursieres": [146.97, 145.90]
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
  const selectElement = document.getElementById('entreprise-select');
  const canvas = document.getElementById('graphique');
  const ctx = canvas.getContext('2d');

  entreprises.forEach(entreprise => {
    const option = document.createElement('option');
    option.textContent = entreprise.nom;
    option.value = entreprise.nom;
    selectElement.appendChild(option);
  });

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

      const labels = ['q1', 'q2', 'q3', 'q4']; 
      const data = entrepriseSelected.valeurs_boursieres;
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
                      min: minValue - minValue * 0.20,
                      max: maxValue + maxValue * 0.20 
                  }
              }
          }
      });
  }
});
