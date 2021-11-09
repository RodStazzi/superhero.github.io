$(document).ready(function () {
   
    let expresion = /^[0-9]*$/gm
    
  let consulta = (id) => {
    $.ajax({
      dataType: "json",
      type: "GET",
      url: `https://www.superheroapi.com/api.php/10216218593416642/${id}`,
      success: (result) => {

        if (result.response === 'success') {
            
            let resultado = `
            <h3 class="text-center">Super Hero encontrado</h3>
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${result.image.url}" class="img-fluid rounded-start" alt="${result.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${result.name}</h5>
                            <p class="card-text">${result.connections['group-affiliation']}</p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${result.biography.publisher}</li>
                                <li class="list-group-item">${result.biography['first-appearance']}</li>
                                <li class="list-group-item">${result.appearance.height}</li>
                                <li class="list-group-item">${result.appearance.weight}</li>
                                <li class="list-group-item">${result.biography.aliases}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
            `;

            $('#resultado').append(resultado);

            let dataPoints = [];

            for (const key in result.powerstats) {

                dataPoints.push({
                    label: key,
                    y: parseInt(result.powerstats[key])
                });
              
            }

            // window.onload = function () {
              var chart = new CanvasJS.Chart("chartContainer", {
                theme: "light2", // "light1", "light2", "dark1", "dark2"
                exportEnabled: true,
                animationEnabled: true,
                title: {
                  text: `Estadísticas de Poder para ${result.name}`,
                  fontWeight: "bold",
                  fontSize: 28,

                },

                legend: {
                  verticalAlign: "bottom",  // "top" , "bottom"
                  //horizontalAlign: "center",  // "center" , "right"
                
                     },

                data: [
                  {
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: dataPoints,
                  },
                ],
              });
              chart.render();
              `<h3 class="text-center">Super Hero encontrado</h3>`
            // };
            // $('#chartContainer').ca

        } else {
            
        }

      },
      error: (error) =>{
          alert('Ha ocurrido un error en la consulta')
      }
    });
  };


  $('form').on('submit', (evento) =>{
      evento.preventDefault();

      $('#resultado').html(' ');

      id = parseInt($('#id').val())

      consulta(id);
  })
});