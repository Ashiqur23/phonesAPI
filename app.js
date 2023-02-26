const loadPhones = async(search, dataLimit ) =>{
    const URL = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(URL);
    const data = await res.json();
    displayPhones(data.data , dataLimit)
}
const displayPhones = (phones , dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent= '';
    // display 10 phone only
    const showAll = document.getElementById('ShowAllBtn');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10)
        showAll.classList.remove('d-none');
        showAll.style.margin = '10px 0'
    }
    else{
        showAll.classList.add('d-none')
    }
// DISPLAY NO PHONE FOUND
    const errorMassage = document.getElementById('error-massage')
    phones.length === 0 ? errorMassage.classList.remove('d-none') : errorMassage.classList.add('d-none');
    // display all phones
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 text-center p-3">
            <div><img src="${phone.image}" class="card-img-top w-50" alt="..."></div>
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with 
                    supporting text below as a natural lead-in to
                    additional content. This content
                    is a little bit longer.
                </p>
                <button onclick= "loadPhoneDetails('${phone.slug}')"
                class="btn btn-primary" type="button"data-bs-toggle="modal"
                 data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });
    // stop loader 
    toggleSpinner(false)
}
const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchInput = document.getElementById('searchInput');
    const searchInputText = searchInput.value;
    loadPhones(searchInputText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10)
})
//  search input field enter key handler
document.getElementById('searchInput').addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        processSearch(10)
    }
})

const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    isLoading === true ? loader.classList.remove('d-none') :
    loader.classList.add('d-none')
}

// not the bet  way to load show all
document.getElementById('btn-showAll').addEventListener('click', function(){
    processSearch()
})
const loadPhoneDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    phoneDetail(data.data)
    
}
const phoneDetail = phone => {
    console.log(phone)
    const modalBody = document.getElementById('modal-body') 
    const phoneDetailModalLabel = document.getElementById('phoneDetailModalLabel');
    phoneDetailModalLabel.innerText = `Name: ${phone.name}`
    modalBody.innerHTML =`
    <img src="${phone.image}" class="img-fluid" alt="">
    <p>ReleaseDate: <u>${phone.releaseDate ? phone.releaseDate : 'No ReleaseDate found'}</u></p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.memory : "no memory information"}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'no Bluetooth information'}</p>
    `
}


// loadPhones('apple');