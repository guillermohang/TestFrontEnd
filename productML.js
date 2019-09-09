function product_ML(productID) { 
    const app = document.getElementById('root');
    const logo = document.createElement('img');

    const table = document.getElementById("tablecreate");

    var path = 'https://api.mercadolibre.com/items/';

    var request = new XMLHttpRequest();
    request.open('GET', path.concat(productID), true);

    request.onload = function () {
        var articulo = JSON.parse(this.response || '{}');

        if (request.status >= 200 && request.status < 400) {
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            // En primer lugar busco la categoría del producto
            var pathRequestCategories = 'https://api.mercadolibre.com/categories/';
            var requestCategories = new XMLHttpRequest();
            requestCategories.open('GET', pathRequestCategories.concat(articulo.category_id), true);

            requestCategories.onload = function () {
                var dataCategories = JSON.parse(this.response || '{}');
                var infoCategories = '';
                for (var i = 0, len = dataCategories.path_from_root.length; i < len; i++) {
                    infoCategories = infoCategories + dataCategories.path_from_root[i].name + ' - ';
                }

                cell1.innerHTML = "<div id='tableprice'>" + infoCategories + "</div>";
            }
            
            requestCategories.send();

            // Muestro la primer imagen disponible de todas
            cell1.innerHTML = "<a href= '" + articulo.permalink + "'><img id='tableimage' src='" + articulo.pictures[0].secure_url + "'></img></a>";

            cell2.innerHTML = "<div id='tableprice'>$ " + articulo.price + "</div>";

            // Evalúo el envío gratis
            if (articulo.shipping.free_shipping) {
                cell2.innerHTML = cell2.innerHTML + "<img src='Assets/ic_shipping.png'></img>";
            }

            cell2.innerHTML = cell2.innerHTML +
                "<div height=32px> </div>" +
                "<div id='tabletitle'>" + articulo.title + "</div>";

            cell3.innerHTML = "<div id='tableaddress'>" + articulo.seller_address.city.name + "</div>";


//            attributes
  //          "id": "ITEM_CONDITION",
    //            "name": "Condición del ítem",
      //              "value_id": "2230284",
        //                "value_name": "Nuevo",
          //                  "value_struct": null,
            //                    "attribute_group_id": "OTHERS",
              //                      "attribute_group_name": "Otros"
        
        //    sold_quantity

      //      https://api.mercadolibre.com/items/MLA729092667/description

    //        {
  //              "text": "",
//                    "plain_text": "Soporte Escritorio Organizador Notebook Monitor Aidata Somos BAZAR LATAM tenemos 100% de Calificaciones Positivas. - Soporte de monitor simple y moderno con plataforma elevada. - Cajón para maximizar el espacio de escritorio y reducir el desorden. - Para monitores de hasta 24 pulgadas, impresoras y otros equipos de oficina. - La ranura frontal sostiene la mayoria de tablets y teléfonos. - Medidas: 55 x 35 x 17,5 cm. - El diseño exclusivo de columbas apilables proporciona un ajuste de altura. - Rango de ajuste de altura: 13 a 17 cm. - Peso máximo: 15 kg. Material: HIPS Peso: 2.26 kg HORARIO DE ATENCION Y ENTREGA: •Lunes a Viernes de 1





        } else {
            const errorMessage = document.createElement('');
            errorMessage.textContent = 'No funciona';
            app.appendChild(errorMessage);
        }
    }

    request.send();
} 

// Función obtenida de https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
