function product_ML(productID) { 
    const table = document.getElementById("tablecreate");

    var path = 'https://api.mercadolibre.com/items/';

    var request = new XMLHttpRequest();
    request.open('GET', path.concat(productID), true);

    request.onload = function () {
        var articulo = JSON.parse(this.response || '{}');

        if (request.status >= 200 && request.status < 400) {
            var rowCategory = table.insertRow(0);
            var cellCategory = rowCategory.insertCell(0);

            var rowProduct = table.insertRow(1);
            var cellPicture = rowProduct.insertCell(0);
            var cellCondition = rowProduct.insertCell(1);
            cellPicture.style.width = '30%';
            cellCondition.style.width = '70%';

            var rowDesc = table.insertRow(2);
            var cellDesc = rowDesc.insertCell(0);

            // En primer lugar busco la categoría del producto
            var pathRequestCategories = 'https://api.mercadolibre.com/categories/';
            var requestCategories = new XMLHttpRequest();
            requestCategories.open('GET', pathRequestCategories.concat(articulo.category_id), true);

            requestCategories.onload = function () {
                var dataCategories = JSON.parse(this.response || '{}');
                var infoCategories = '';
                for (var i = 0, len = dataCategories.path_from_root.length; i < len; i++) {
                    infoCategories = infoCategories + dataCategories.path_from_root[i].name + ' > ';
                }

                cellCategory.innerHTML = "<td><p><div id='tablecategory'>" + infoCategories + "</div></p></td>";
            }
            
            requestCategories.send();

            // Muestro la primer imagen disponible de todas
            cellPicture.innerHTML = "<td><p><img id='productimage' src='" + articulo.pictures[0].secure_url + "'></img></p></td>";

            // Obtengo la condición del producto
            var infoCondition = '';
                for (var i = 0, len = articulo.attributes.length; i < len; i++) {
                  if (articulo.attributes[i].id == "ITEM_CONDITION") {
                    infoCondition = articulo.attributes[i].value_name;
                  }
                }

            cellCondition.innerHTML = "<td><table><p><div id='tablecondition'>" + infoCondition + " - " + articulo.sold_quantity + " vendidos</div></p></td></tr>" + 
                                "<tr><td><p><div id='tableconditiontitle'>" + articulo.title + "</div></p></td></tr>" + 
                                "<tr><td><p><div id='tableconditionprice'>$ " + articulo.price + "</div></p></td></tr>" + 
                                "<tr><td><p><img src='Assets/ComprarML.jpg'></img></p></td></tr>" + 
                              "</table></td>"

            // Obtengo la descripción del producto
            var pathRequestDescripcion = 'https://api.mercadolibre.com/items/';
                var requestDescription = new XMLHttpRequest();
                requestDescription.open('GET', pathRequestDescripcion.concat(articulo.id, "/description"), true);
                requestDescription.onload = function () {
                    var dataDescription = JSON.parse(this.response || '{}');
                    cellDesc.innerHTML = "<td><p><div id='descriptiontitle'>Descripci&oacuten del producto</div></p></td>" + 
                      "<td><p><div id='descriptionbody'>" + dataDescription.plain_text + "</div></p></td>"
                }
                requestDescription.send(); 

        } else {
            const errorMessage = document.createElement('');
            errorMessage.textContent = 'No funciona';
            console.log(errorMessage);
        }
    }

    request.send();
} 
