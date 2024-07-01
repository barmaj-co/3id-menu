var API_KEY = 'AIzaSyArtUHo4LxHfqwuQokbdiQjwxpfkxvg2hM'; // Replace with your Google API key
var EXCEL_API = 'https://sheets.googleapis.com/v4/spreadsheets/';
var providerMenuItems = [];
var providerInfo = {};

function getSheetAPI(sheetId, sheetName) {
    return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;
}

function getIndexInfo() {
    let SPREADSHEET_ID = '1Q2mHe5wjkjJrpydV9HTC20dlAAI32hfvxaBteChzJ74';
    let sheet = 'Ads-Images!A2:R'; // Adjust the ranges as needed

    let url = getSheetAPI(SPREADSHEET_ID, sheet);
    $.getJSON(url, function (data) {
        let images = data.values.map(item => item[2]);
        drawImages(images);

        document.querySelector('#preloader').remove();
    }).fail(function (err) {
        console.error('Error: ', err);
    });
}

function drawImages(images) {
    for (let index = 0; index < images.length; index++) {
        $(".ads-images").append(`
            <div class="carousel-item ${index == 0 ? 'active' : ''}">
              <img src="${images[index]}" class="d-block w-100" alt="...">
            </div>
            `);

        $(".ads-indicators").append(`
            <button type="button" data-bs-target="#carouselHeaderImages" data-bs-slide-to="${index}" class="${index == 0 ? 'active' : ''}"
              aria-current="true" aria-label="Slide ${index}"></button>
            `);
    }
}

function drawCategories() {
    let categories = [
        {
            name: "مطاعم تك اواى",
            image: "./assets/img/pasta.png",
            type: 0
        },
        {
            name: "أكل بيتى",
            image: "./assets/img/house.png",
            type: 1
        }
    ];
    categories?.forEach(item => {
        $("#categories-section-items").append(drawCard(item));
    });
}

function drawCard(item) {
    return `
            <div class="col-lg-2 col-md-6 col-6 text-center mb-4">
              <a href="./providers.html?type=${item.type}">
                <img class="img-fluid mb-4" src="${item.image}" width="100" alt="Image" style="border-radius: 10px">
                <h6 class="card-title text-center" style="color: gray; font-weight: 700">${item.name}</h6>
              </a>
            </div>
            `;
}