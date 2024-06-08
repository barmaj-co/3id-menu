let _menuItems = getMenuItems();

function drawMenus() {
    for (let index = 0; index < _menuItems.length; index++) {
        let menuTitle = drawMenuTitle(index, _menuItems[index].displayName, _menuItems[index].bsTarget);
        $(".menu-tab-titles").append(menuTitle);

        let menuTabs = drawMenuTabs(index, _menuItems[index].bsTarget);
        $(".menu-tab-contents").append(menuTabs);

        _menuItems[index].items.forEach(item => {
            item.imagePath = `assets/img/menu/${_menuItems[index].imagePlace}/${item.imagePath}`;
            let menuItem = drawMenuItem(item.imagePath, item.name, item.description, item.price);
            $(`#${_menuItems[index].bsTarget}-items`).append(menuItem);
        });
    }
}

function drawMenuTitle(index, title, bsTarget){
    let menuTitle = `<li class="nav-item">
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

function drawMenuItem(imagePath, name, description, price) {
    let menuItem = `<div class=" col-lg-3 col-md-4 col-12">
                <div class="menu-item mt-4">
                  <img class="menu-img img-fluid" src="${imagePath}">
                  <div class="menu-product-info-text mb-3 mt-5">
                    <h4>
                      <span>${name}</span> - <span class=" price"> ${price} <span>ج</span></span>
                    </h4>
                    <p class=" ingredients mt-1">${description}</p>
                  </div>
                  <a class=" btn-add-product-to-cart" href="javascript:void(0)" onclick="addToCart('${name}', ${price})">اطلب الان <i class="icon bi bi-cart"></i></a>
                </div>
              </div>`;

    return menuItem;
}