var API_KEY = 'AIzaSyArtUHo4LxHfqwuQokbdiQjwxpfkxvg2hM'; // Replace with your Google API key
var EXCEL_API = 'https://sheets.googleapis.com/v4/spreadsheets/';
var providerMenuItems = [];
var providerInfo = {};

function getSheetAPI(sheetId, sheetName) {
    return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;
}

function getProviderInfo() {
    let SPREADSHEET_ID = '1Q2mHe5wjkjJrpydV9HTC20dlAAI32hfvxaBteChzJ74';
    let sheet = 'Providers!A2:M'; // Adjust the ranges as needed
    let providerQuery = new URLSearchParams(window.location.search).get('provider')?.toString();

    let url = getSheetAPI(SPREADSHEET_ID, sheet);
    $.getJSON(url, function (data) {
        let provider = data.values.find(row => {
            return row.length > 1 && row[1].includes(providerQuery);
        });

        if (provider) {
            setProviderInfo(provider);
        }
        else {
            location.href = 'notfound.html';
        }
    }).fail(function (err) {
        console.error('Error: ', err);
    });
}

function setProviderInfo(provider) {
    providerInfo = {
        id: provider[0],
        brandName: provider[3],
        address: provider[4],
        whatsappNumber: provider[5]?.startsWith('0') ? provider[5] : `0${provider[5]}`,
        mobileNumber: provider[6]?.startsWith('0') ? provider[6] : `0${provider[6]}`,
        lineNumber: provider[7]?.startsWith('0') ? provider[7] : `0${provider[7]}`,
        workingHours: provider[8],
        hideCart: provider[9] == "1",
        disableCart: provider[10] == "1",
        hideGallary: provider[11] == "1",
        mainColor: provider[12]
    };
    
    $(".provider-brand-name").text(provider[3]);
    $(".contact #address").text(provider[4]);
    $(".contact #whatsappNumber").text(providerInfo?.whatsappNumber);
    $(".contact #mobileNumber").text(providerInfo?.mobileNumber);
    $(".contact #lineNumber").text(providerInfo?.lineNumber);
    $(".contact #workingHours").text(provider[8]);

    if (providerInfo?.hideGallary) {
        $("#gallery").remove();
    } else {
        loadProviderGallary(provider[2]);
    }

    loadProviderCategories(provider[2]);
}

function loadProviderGallary(sheetId) {
    let sheet = 'Gallary!A2:C'; // Adjust the ranges as needed
    let url = getSheetAPI(sheetId, sheet);
    $.getJSON(url, function (data) {
        let images = data?.values;
        if (images) {
            $(".gallery").css("visibility", "unset");
            images.forEach(image => {
                let menuItem = drawGalleryItem(image[2]);
                $("#gallery-section-items").append(menuItem);
            });
        } else {
            $("#gallery").css("visibility", "hidden");
        }
    }).fail(function (err) {
        console.error('Error: ', err);
    });
}

function drawGalleryItem(imagePath) {
    let slider = `<div class="swiper-slide">
                    <img class="img-fluid" src="${imagePath}" alt="Image">
                  </div>`;

    return slider;
}

function loadProviderCategories(sheetId) {
    let sheet = 'Categories!A2:C'; // Adjust the ranges as needed
    let url = getSheetAPI(sheetId, sheet);
    $.getJSON(url, function (data) {
        let categories = data?.values;
        for (let index = 0; index < categories.length; index++) {
            providerMenuItems.push({
                id: categories[index][0],
                displayName: categories[index][1],
                bsTarget: `category-${categories[index][0]}`,
                items: []
            });

            let menuTitle = drawMenuTitle(index, categories[index][1], `category-${categories[index][0]}`);
            $(".menu-tab-titles").append(menuTitle);

            let menuTabs = drawMenuTabs(index, `category-${categories[index][0]}`);
            $(".menu-tab-contents").append(menuTabs);
        }

        loadProviderMenuItems(sheetId);

    }).fail(function (err) {
        console.error('Error: ', err);
    });
}

function drawMenuTitle(index, title, bsTarget) {
    let menuTitle = `<li class="nav-item category${index}">
                        <a class="nav-link ${index == 0 ? "active show" : ""}" data-bs-toggle="tab" data-bs-target="#${bsTarget}">
                        <h4>${title}</h4>
                        </a>
                    </li>`;
    return menuTitle;
}

function drawMenuTabs(index, bsTarget) {
    let menuContent = `<div class="tab-pane fade ${index == 0 ? "active show" : ""}" id="${bsTarget}">
                            <div class="row gy-5" id="${bsTarget}-items">
                            </div>
                        </div>`;
    return menuContent;
}

function loadProviderMenuItems(sheetId) {
    let sheet = 'MenuItems!A2:G'; // Adjust the ranges as needed
    let url = getSheetAPI(sheetId, sheet);
    $.getJSON(url, function (data) {
        let meunItems = data?.values;
        meunItems?.forEach(item => {
            providerMenuItems.find(r => r.id == item[4])?.items.push({
                id: item[0],
                imagePath: item[6],
                name: item[1],
                description: item[2],
                price: item[3]
            });

            let menuItem = drawMenuItem(item[0], item[6], item[1], item[2], item[3]);
            $(`#category-${item[4]}-items`).append(menuItem);
        });

        providerMenuItems.filter(r => r.items.length == 0).forEach(m => {
            $(`.category${(+m.id) - 1}`).remove();
        });

        if (providerInfo.hideCart) {
            $(".menu-item .btn-add-product-to-cart").remove();
            $(".header .btn-cart-icon").remove();
        }

        document.documentElement.style.setProperty('--color-primary', providerInfo?.mainColor ?? "#ce1212");
        document.querySelector('#preloader').remove();

    }).fail(function (err) {
        console.error('Error: ', err);
    });
}

function drawMenuItem(id, imagePath, name, description, price) {
    let menuItem = `<div class=" col-lg-3 col-md-4 col-12">
                <div class="menu-item mt-4">
                  <img class="menu-img img-fluid" src="${imagePath}">
                  <div class="menu-product-info-text mb-3 mt-5">
                    <h4>
                      <span>${name}</span> - <span class=" price"> ${price} <span>ج</span></span>
                    </h4>
                    <p class=" ingredients mt-1">${description}</p>
                  </div>
                  <a class=" btn-add-product-to-cart" href="javascript:void(0)" onclick="addToCart(${id})">اطلب الان <i class="icon bi bi-cart"></i></a>
                </div>
              </div>`;

    return menuItem;
}

function getMenuItems() {
    return providerMenuItems;
}