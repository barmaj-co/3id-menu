var API_KEY = 'AIzaSyArtUHo4LxHfqwuQokbdiQjwxpfkxvg2hM'; // Replace with your Google API key
var EXCEL_API = 'https://sheets.googleapis.com/v4/spreadsheets/';
var providerMenuItems = [];
var providerInfo = {};

function getSheetAPI(sheetId, sheetName) {
    return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;
}

function getProvidersInfo() {
    let SPREADSHEET_ID = '1Q2mHe5wjkjJrpydV9HTC20dlAAI32hfvxaBteChzJ74';
    let sheet = 'Providers!A2:R'; // Adjust the ranges as needed

    let url = getSheetAPI(SPREADSHEET_ID, sheet);
    let typeQuery = +(new URLSearchParams(window.location.search).get('type'));
    if (typeQuery == 0) {
        $(".page-title").append("مطاعم تك اواى");
    } else if (typeQuery == 1) {
        $(".page-title").append("أكل بيتى");
    }

    $.getJSON(url, function (data) {

        let providers = data?.values.filter(item => item[13] == typeQuery);
        providers?.forEach(item => {
            let providerCard = {
                name: item[3],
                image: item[15],
                segment: item[1]
            };

            $("#section-items").append(drawCard(providerCard));
        });

        document.querySelector('#preloader').remove();
    }).fail(function (err) {
        console.error('Error: ', err);
    });
}


function drawCard(item) {
    return `
            <div class="col-lg-3 col-md-6 col-12 text-center mb-4">
              <a href="./menu.html?provider=${item.segment}">
                <img class="img-fluid mb-2" src="${item.image}" alt="Image" style="border-radius: 10px">
                <h6 class="card-title text-center" style="color: gray; font-weight: 700">${item.name}</h6>
              </a>
            </div>
            `;
}