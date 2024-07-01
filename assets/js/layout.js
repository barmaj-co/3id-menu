function drawLayout() {
    $("#siteTitle").text("هاتلى");
    drawHeader();
    drawFooter();
    
    drawWarningCartToOpenfromMenuOnlyModal();
    drawProductModal();
    drawDisableCartModal();
    drawCartCheckoutModal();
    drawContactDeveloperModal();
    drawCartCheckoutProductTemplate();
    onLoadPage();
}

function onLoadPage() {
    let cart = JSON.parse(localStorage.getItem('cart')) ?? [];
    $(".header .cart-counter").text(cart.length);

    $("#currentYear").text(new Date().getFullYear());
}

function drawHeader() {
    let header = `
    <header id="header" class="header fixed-top d-flex align-items-center">
        <div class="container d-flex align-items-center justify-content-between">

        <a href="#" class="logo d-flex align-items-center me-lg-0">
            <!-- <img src="assets/img/logo.png" alt=""> -->
            <h4><span class="provider-brand-name">هاتلى</span><span>.</span></h4>
        </a>

        <a class="btn-cart-icon" href="javascript:void(0)" onclick="onOpenCartCheckoutModal()">
            <i class="icon bi bi-cart"></i>
            <div class="cart-counter">0</div>
        </a>
        </div>
    </header>
  `;

    $(".header-section").append(header);
}

function drawFooter() {
    let footer = `
    <footer id="footer" class="footer">
        <div class="text-center">
            جميع الحقوق محفوظة &copy; <span id="currentYear"></span>
        </div>
        <div class="credits">
          تصميم <button type="button" class="btn btn-link" onclick="$('#footerModal').modal('show')">م. اسلام السيد
            هيكل</button> 
        </div>
    </footer>
  `;

    $(".footer-section").append(footer);
}

function drawContactDeveloperModal() {
    let modal = `
    <div class="modal fade" id="footerModal" tabindex="-1" role="dialog" aria-labelledby="footerModalLabel">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="footerModalLabel"></h5>
            <button type="button" class="close quickview__close--btn" onclick="$('#footerModal').modal('hide')">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body text-center pt-0" style="margin-top: -15px;">
            <img src="./assets/img/online-shop.png" width="150" height="150" class="mb-3">
            <div class="mb-3">
                <h6 class="text-secondary">
                اجعل عملائك يجدونك بسهولة<br /> ووفر لهم تجربة شراء جديدة من موقعك
                <img src="./assets/img/happy.png" width="30" height="30">
                </h6>
            </div>

            <div class="text-center mb-3">
                <div class="form-group mb-3">
                <input type="email" class="form-control" id="providerName" placeholder="الاسم">
                </div>

                <a class=" btn-send-whatsapp" href="javascript:void(0)" onclick="onSendWhatsappDeveloper()">كلمنا
                وانشئ
                موقعك الان<i class="icon bi bi-whatsapp pr-2"></i></a>
            </div>
            </div>
        </div>
        </div>
    </div>
  `;

    $(".modals-section").append(modal);
}

function drawCartCheckoutModal() {
    let modal = `
    <div class="modal fade" id="cartCheckoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <header class="modal-header quickview__header">
                            <h5 class="modal-title">المشتريات  <b class="checkout-provider-name"></b></h5>
                            <button class="close-modal quickview__close--btn" onclick="closeCartModal()" data-close="">x
                            </button>
                        </header>
                        <hr />
                        <div class="quickview__info mt-1" id="cartCheckoutModalProducts"></div>

                        <div class="d-flex justify-content-between align-items-center">
                            <h3 class="checkout-total-title">الاجمالى</h3>
                            <div class="product__details--info__price ">
                                <span class=" price"> <span class="current__price checkout-total-price"></span>
                                    <span>ج</span></span>
                            </div>
                        </div>
                        <h5 class="modal-title mt-4 mb-3">بيانات العميل</h5>

                        <div class="form-group mb-3">
                            <input type="email" class="form-control" id="clientName" placeholder="الاسم">
                        </div>

                        <div class="form-group mb-3">
                            <input type="number" class="form-control" id="clientNumber" placeholder="رقم الهاتف">
                        </div>

                        <div class="form-group mb-3">
                            <input type="email" class="form-control" id="clientAddress" placeholder="العنوان">
                        </div>

                        <div class="mt-4 mb-3 text-center">
                            <a class=" btn-send-whatsapp" href="javascript:void(0)" onclick="onSendWhatsappOrder()">أرسل
                                الطلب
                                واتس<i class="icon bi bi-whatsapp pr-2"></i></a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
  `;

    $(".modals-section").append(modal);
}

function drawProductModal() {
    let modal = `
   <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <header class="modal-header quickview__header">
                <button class="close-modal quickview__close--btn" onclick="closeCartModal()" data-close="">x </button>
              </header>
  
              <div class="item-media">
                <div id="item-slider" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-indicators modal-carousel-indicators"></div>
                  <div class="carousel-inner product-images-slider"></div>
  
                  <button class="carousel-control-prev" type="button" data-bs-target="#item-slider" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#item-slider" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
  
              <div class="quickview__info">
                <h3 class="product__details--info__title mb-2"></h3>
                <div class="product__details--info__price mb-12">
                  <span class=" price"> <span class="current__price"></span> <span>ج</span></span>
                </div>
                <p class="product__details--info__desc mb-15 text-secondary"></p>
  
                <div class="product__variant">
                  <div
                    class="quickview__variant--list quantity d-flex align-items-center justify-content-between pb-4 border-bottom">
                    <div class="product__variant--title">الكمية :</div>
  
                    <div class="quantity__box">
                      <button type="button" class="quantity__value quickview__value--quantity decrease"
                        aria-label="quantity value" onclick="onDecrease()" value="Decrease Value">-</button>
                      <label>
                        <input type="text" class="quantity__number quickview__value--number" value="1" disabled>
                      </label>
                      <button type="button" class="quantity__value quickview__value--quantity increase"
                        aria-label="quantity value" onclick="onIncrease()" value="Increase Value">+</button>
                    </div>
                  </div>
                </div>
  
                <div class="mt-4 mb-3 text-center">
                  <a class=" btn-add-product-to-cart" href="javascript:void(0)" onclick="onAddToCart()">اضافة الى السلة
                    (<span class="product-total-price"></span>)</a>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </div>
  `;

    $(".modals-section").append(modal);
}

function drawDisableCartModal() {
    let modal = `
    <div class="modal fade" id="disableCartModal" tabindex="-1" role="dialog" aria-labelledby="footerModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="footerModalLabel"></h5>
                        <button type="button" class="close quickview__close--btn"
                            onclick="$('#disableCartModal').modal('hide')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center pt-0" style="margin-top: -15px;">
                        <img src="./assets/img/online-shopping (1).png" width="150" height="150" class="mb-3">
                        <div class="mb-3">
                            <h6 class="text-secondary">
                                استعد لتجربة الشراء اونلاين , قريباً !!
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;

    $(".modals-section").append(modal);
}

function drawWarningCartToOpenfromMenuOnlyModal() {
    let modal = `
    <div class="modal fade" id="warningCartToOpenfromMenuOnlyModal" tabindex="-1" role="dialog" aria-labelledby="footerModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="footerModalLabel"></h5>
                        <button type="button" class="close quickview__close--btn"
                            onclick="$('#warningCartToOpenfromMenuOnlyModal').modal('hide')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center pt-0" style="margin-top: -15px;">
                        <img src="./assets/img/warning.png" width="150" height="150" class="mb-3">
                        <div class="mb-3">
                            <h6 class="text-secondary">
                                عفوا يمكنك الشراء فقط من قائمة الاسعار !!
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;

    $(".modals-section").append(modal);
}

function drawCartCheckoutProductTemplate() {
    let template = `
        <script id="cartCheckoutProductTemplate" type="text/template">
            <div class="cart-checkout-product">
                <div class="mb-2 d-flex justify-content-between align-items-center">
                    <h3 class="product__details--info__title">__Name__</h3>
                    <div class="product__details--info__price ">
                    <span class=" price"> <span class="current__price current__price-__ConcatName__">__Price__</span> <span>ج</span></span>
                    </div>
                </div>

                <div class="product__variant">
                    <div class="quickview__variant--list quantity d-flex align-items-center justify-content-between pb-2 mb-2 border-bottom">
                        <a class="product__variant--title cart-btn-delete" onclick="onRemoveCheckout('__Name__')" href="javascript:void(0)"><i class="icon bi bi-trash"></i></a>
                        <div class="quantity__box">
                            <button type="button" class="quantity__value quickview__value--quantity decrease" onclick="onDecreaseCheckout('__Name__')">-</button>
                            <label>
                            <input type="text" class="quantity__number quickview__value--number quantity__number-__ConcatName__" value="__Qty__" disabled>
                            </label>
                            <button type="button" class="quantity__value quickview__value--quantity increase" onclick="onIncreaseCheckout('__Name__')">+</button>
                        </div>
                    </div>
                </div>          
            </div>
        </script>
    `;

    $(".templates-section").append(template);
}