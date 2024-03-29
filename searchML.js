function search_ML(searchText) {
    if (searchText != null && searchText != '') {
        const table = document.getElementById("tablecreate");

        const container = document.createElement('div');
        container.setAttribute('class', 'container');

        var path = 'https://api.mercadolibre.com/sites/MLA/search?q=';

        var request = new XMLHttpRequest();
        request.open('GET', path.concat(searchText), true);

        request.onload = function () {
            //      var data = JSON.parse(this.response);
            var data = JSON.parse(this.response || '{}');

            // console.log(data);

            if (request.status >= 200 && request.status < 400) {
                data.results.slice(0, 4).forEach(articulo => {
                    const card = document.createElement('div');
                    card.setAttribute('class', 'card');

                    const h1 = document.createElement('h1');
                    h1.textContent = articulo.title;

                    const p = document.createElement('p');
                    p.textContent = `$ ${articulo.seller.id}`;

                    var row = table.insertRow(0);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);

                    // La imagen que me trae el JSON es muy pequeña, la traigo de otro recurso
                    var pathRequestImage = 'https://api.mercadolibre.com/items/';
                    var requestImage = new XMLHttpRequest();
                    requestImage.open('GET', pathRequestImage.concat(articulo.id), true);
                    requestImage.onload = function () {
                        var dataImage = JSON.parse(this.response || '{}');
                        cell1.innerHTML = "<a href= 'Product.html?id=" + articulo.id + "'><img id='tableimage' src='" + dataImage.pictures[0].secure_url + "'></img></a>";
                    }
                    requestImage.send();

                    // En la búsqueda de Mercado Libre no muestra la descripción completa, asi que la trunco
                    articulo.title = articulo.title.substring(0, 60);

                    cell2.innerHTML = "<div id='tableprice'>$ " + articulo.price + "</div>";

                    // Evalúo y muestro el envío gratis
                    if (articulo.shipping.free_shipping) {
                        cell2.innerHTML = cell2.innerHTML + "<img src='Assets/ic_shipping.png'></img>";
                    }

                    cell2.innerHTML = cell2.innerHTML +
                        "<div height=32px> </div>" +
                        "<div id='tabletitle'>" + `${articulo.title}...` + "</div>";

                    cell3.innerHTML = "<div id='tableaddress'>" + articulo.address.city_name + "</div>";
                });
            } else {
                const errorMessage = document.createElement('');
                errorMessage.textContent = 'No funciona';
                console.log(errorMessage);
            }
        }

        request.send();
    }
}

function openSearchPage() {
    let input = document.getElementById('searchbar').value;

    window.open("Index.html?id=" + input, "_self");
}
