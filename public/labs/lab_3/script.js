    let width = 130; 
    let count = 4; 

    let list = carousel.querySelector('ul');
    let listItems = carousel.querySelectorAll('li');

    let position = 0; 

    carousel.querySelector('.prev').onclick = function() {
      position += width * count;
      position = Math.min(position, 0)
      list.style.marginLeft = position + 'px';
    };

    carousel.querySelector('.next').onclick = function() {
      position -= width * count;
      position = Math.max(position, -width * (listItems.length - count));
      list.style.marginLeft = position + 'px';
    };
