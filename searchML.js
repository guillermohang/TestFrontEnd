function search_ML() { 
    let input = document.getElementById('searchbar').value 
    
    // input=input.toLowerCase(); 
    
    var request = new XMLHttpRequest();
    request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
          data.forEach(movie => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
      
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;
      
            const p = document.createElement('p');
            movie.description = movie.description.substring(0, 300);
            p.textContent = `${movie.description}...`;
      
            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
          });
        } else {
          const errorMessage = document.createElement('marquee');
          errorMessage.textContent = `Gah, it's not working!`;
          app.appendChild(errorMessage);
        }
      }

      request.send();

    // https://api.mercadolibre.com/sites/MLA/search?q= :query



	// let x = document.getElementsByClassName('products'); 
	
	// for (i = 0; i < x.length; i++) { 
	// 	if (!x[i].innerHTML.toLowerCase().includes(input)) { 
	// 		x[i].style.display="none"; 
	// 	} 
	// 	else { 
	// 		x[i].style.display="list-item";				 
	// 	} 
	// } 
} 
