// länka till quire logo för att visa default view
const quireLogo = document.getElementById('quire-logo') as HTMLImageElement;

quireLogo.addEventListener('click', function(){
    location.reload();
})

//visa alla anteckningar i mainOutput