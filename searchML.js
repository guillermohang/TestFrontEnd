function search_ML() { 
    let input = document.getElementById('searchbar').value 
    
    const app = document.getElementById('root');
    const logo = document.createElement('img');
    
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    
    app.appendChild(logo);
    app.appendChild(container);

    var path = 'https://api.mercadolibre.com/sites/MLA/search?q=';
    //var path = 'https://ghibliapi.herokuapp.com/films';

    var request = new XMLHttpRequest();
    request.open('GET', path.concat(input), true);

    request.onload = function () {
//      var data = JSON.parse(this.response);
      var data = JSON.parse(this.response || '{}');
    
      // const errorMessage = document.createElement('marquee');
      // errorMessage.textContent = this.responseText;
      // app.appendChild(errorMessage);  
  
      // console.log(data);
      
        if (request.status >= 200 && request.status < 400) {
          data.results.slice(0, 4).forEach(articulo => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
      
            const h1 = document.createElement('h1');
            h1.textContent = articulo.title;
      
            const p = document.createElement('p');
            p.textContent = `$ ${articulo.seller.id}`;
      
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
          });
        } else {
          const errorMessage = document.createElement('marquee');
          errorMessage.textContent = 'No funciona';
          app.appendChild(errorMessage);
        }
      }

      request.send();
} 
