const URL = 'https://api.thecatapi.com/v1/images/search?limit=3&';
const URL_LIKE = 'https://api.thecatapi.com/v1/favourites';
const URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.getElementById('error');

async function getRandomCat() {
    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = `Hubo un Error: ${response.status} ${data.message}`
    }else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick = () => saveFavouritesCat(data[0].id);
        btn2.onclick = () => saveFavouritesCat(data[1].id);
        btn3.onclick = () => saveFavouritesCat(data[2].id);
    }
}

async function LoadFavoritesCat() {

    const response = await fetch(URL_LIKE, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_BJhJhc8xf7e26RiUAZmw3FcotTo8DbZjRgpQmKutE8guRKhWzDMb6DFN4GFHDim5'
        },
    });
    const data = await response.json();
    console.log(data);

    if (response.status !== 200) {
        spanError.innerHTML = `Hubo un Error: ${response.status} ${data.message}`
    }else {
        const section = document.getElementById('favoriteMichis')

        section.innerHTML = "";
        const h2 = document.createElement('h2')
        const h2txt = document.createTextNode('Michis Favoritos');

        h2.appendChild(h2txt);

        section.appendChild(h2);

        data.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar de Favoritos');

            btn.appendChild(btnText);
            btn.onclick = () => deleteCat(cat.id);
            img.width = 150;
            img.src = cat.image.url;
            
            article.appendChild(img);
            article.appendChild(btn);

            section.appendChild(article);
        });
    }
}

async function saveFavouritesCat(id){
    const response = await fetch(URL_LIKE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_BJhJhc8xf7e26RiUAZmw3FcotTo8DbZjRgpQmKutE8guRKhWzDMb6DFN4GFHDim5'
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await response.json();

    if (response.status !== 200) {
        spanError.innerHTML = `Hubo un Error: ${response.status} ${data.message}`
    }else{
        console.log('Guardado con éxito');
        LoadFavoritesCat();
    }

}

async function deleteCat(id){
    const response = await fetch(URL_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_BJhJhc8xf7e26RiUAZmw3FcotTo8DbZjRgpQmKutE8guRKhWzDMb6DFN4GFHDim5'
        },
    })
    const data = await response.json();

    if (response.status !== 200) {
        spanError.innerHTML = `Hubo un Error: ${response.status} ${data.message}`
    }else{
        console.log('Borrado exitoso');
        LoadFavoritesCat();
    }
}

getRandomCat();
LoadFavoritesCat();

