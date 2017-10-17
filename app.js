(function() {
  
  var FLICKR_API_KEY = 'b057fb3885ab3d6506d7eae5086b4430';   
  var userInput = prompt("Please input search term:");
  
  //function results to urls
  function toUrl () {

    var url = `https://farm${farm-id}.staticflickr.com/${server-id}/${id}_${secret}_s.jpg`
    
    // farm-id: 1
    // server-id: 2
    // photo-id: 1418878
    // secret: 1e92283336
    // size: m

    return url;
  }

  function getPhotosForSearch (searchTerm) {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${FLICKR_API_KEY}&text=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        var photoArray = data.photos.photo.map(photo => ({
          thumb: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`,
          large: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
          title: photo.title
        }))
        photoArray.forEach((photo, index) => {
          var link = document.createElement('a');
          link.setAttribute('href', photo.large);
          link.setAttribute('target', '_blank');
          link.setAttribute('min-height', '100px')
          link.setAttribute('min-width', '100px')
          // link.setAttribute('max-height', '100px')
          // link.setAttribute('max-width', '100px')
        
          var image = document.createElement('img');
          image.setAttribute('src', photo.thumb);
          image.setAttribute('alt', photo.title);
          link.appendChild(image);
          
          var container = document.getElementById('container')
          return container.appendChild(link)
        })
        console.log(photoArray)
      }) 
  }
  getPhotosForSearch(userInput);
})();
  


//style container using flexbox