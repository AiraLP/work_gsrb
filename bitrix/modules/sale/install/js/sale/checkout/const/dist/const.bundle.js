this.BX = this.BX || {};
this.BX.Sale = this.BX.Sale || {};
this.BX.Sale.Checkout = this.BX.Sale.Checkout || {};
(function (exports) {
    'use strict';

    var EventType = Object.freeze({
      order: {
        success: 'BX:Sale:Checkout:EventType:order:success'
      },
      basket: {
        inputChangeQuantityProduct: 'BX:Sale:Checkout:EventType:basket:inputChangeQuantityProduct',
        buttonRemoveProduct: 'BX:Sale:Checkout:EventType:basket:buttonRemoveProduct',
        buttonPlusProduct: 'BX:Sale:Checkout:EventType:basket:buttonPlusProduct',
        buttonMinusProduct: 'BX:Sale:Checkout:EventType:basket:buttonMinusProduct',
        buttonRestoreProduct: 'BX:Sale:Checkout:EventType:basket:buttonRestoreProduct',
        removeProduct: 'BX:Sale:Checkout:EventType:basket:removeProduct',
        restoreProduct: 'BX:Sale:Checkout:EventType:basket:restoreProduct',
        backdropClose: 'BX:Sale:Checkout:EventType:basket:backdropClose',
        backdropOpenMobileMenu: 'BX:Sale:Checkout:EventType:basket:backdropOpenMobileMenu',
        backdropOpenChangeSku: 'BX:Sale:Checkout:EventType:basket:backdropOpenChangeSku',
        backdropTotalClose: 'BX:Sale:Checkout:EventType:basket:backdropTotalClose',
        backdropTotalOpen: 'BX:Sale:Checkout:EventType:basket:backdropTotalOpen',
        needRefresh: 'BX:Sale:Checkout:EventType:basket:needRefresh',
        refreshAfter: 'BX:Sale:Checkout:EventType:basket:refreshAfter',
        changeSku: 'BX:Sale:Checkout:EventType:basket:changeSku',
        changeSkuOriginName: 'SkuProperty::onChange'
      },
      consent: {
        refused: 'BX:Sale:Checkout:EventType:consent:refused',
        accepted: 'BX:Sale:Checkout:EventType:consent:accepted'
      },
      element: {
        buttonCheckout: 'BX:Sale:Checkout:EventType:element:buttonCheckout',
        buttonShipping: 'BX:Sale:Checkout:EventType:element:buttonShipping'
      },
      property: {
        validate: 'BX:Sale:Checkout:EventType:property:validate'
      },
      application: {
        none: 'BX:Sale:Checkout:EventType:application:status:none',
        wait: 'BX:Sale:Checkout:EventType:application:status:wait'
      },
      paysystem: {
        beforeInitList: 'BX:Sale:Checkout:EventType:paysystem:beforeInitList',
        afterInitList: 'BX:Sale:Checkout:EventType:paysystem:afterInitList'
      }
    });

    var RestMethod = Object.freeze({
      saleEntityAddBasketItem: 'addBasketItem',
      saleEntityUpdateBasketItem: 'updateBasketItem',
      saleEntityDeleteBasketItem: 'deleteBasketItem',
      saleEntityRecalculateBasket: 'recalculateBasket',
      saleEntityGetBasket: 'getBasket',
      saleEntityUserConsentRequest: 'userconsentrequest',
      saleEntitySaveOrder: 'saveOrder',
      saleEntityPaymentPay: 'paymentpay'
    });

    var Application = Object.freeze({
      stage: {
        view: 'Application.stage.view',
        edit: 'Application.stage.edit',
        payed: 'Application.stage.payed',
        empty: 'Application.stage.empty',
        success: 'Application.stage.success',
        undefined: 'Application.stage.undefined'
      },
      mode: {
        view: 'Application.mode.view',
        edit: 'Application.mode.edit'
      }
    });

    var PaySystem = Object.freeze({
      type: {
        cash: 'CASH',
        cashLess: 'CASH_LESS',
        cardTransaction: 'CARD_TRANSACTION',
        undefined: 'UNDEFINED'
      }
    });

    var Component = Object.freeze({
      bitrixSaleOrderCheckout: 'bitrix:sale.order.checkout'
    });

    var Property = Object.freeze({
      validate: {
        failure: 'Property.Validate.failure',
        successful: 'Property.Validate.successful',
        unvalidated: 'Property.Validate.unvalidated'
      },
      type: {
        name: 'NAME',
        email: 'EMAIL',
        phone: 'PHONE',
        string: 'STRING',
        number: 'NUMBER',
        checkbox: 'Y/N',
        date: 'DATE',
        datetime: 'DATETIME',
        "enum": 'ENUM',
        undefined: 'UNDEFINED'
      }
    });

    var Product = Object.freeze({
      type: {
        product: 'product',
        service: 'service'
      }
    });

    var Consent = Object.freeze({
      status: {
        init: 'Consent.status.init',
        refused: 'Consent.status.refused',
        accepted: 'Consent.status.accepted'
      },
      validate: {
        submit: 'Consent.validate.submit'
      }
    });

    var Loader = Object.freeze({
      status: {
        none: 'Loader.status.none',
        wait: 'Loader.status.wait'
      }
    });

    var Check = Object.freeze({
      status: {
        "new": 'N',
        error: 'E',
        process: 'P',
        printed: 'Y'
      }
    });

    var Pool = Object.freeze({
      action: {
        offer: 'offer',
        "delete": 'delete',
        restore: 'restore',
        quantity: 'quantity'
      }
    });

    exports.EventType = EventType;
    exports.RestMethod = RestMethod;
    exports.Application = Application;
    exports.PaySystem = PaySystem;
    exports.Component = Component;
    exports.Property = Property;
    exports.Product = Product;
    exports.Consent = Consent;
    exports.Loader = Loader;
    exports.Check = Check;
    exports.Pool = Pool;

}((this.BX.Sale.Checkout.Const = this.BX.Sale.Checkout.Const || {})));
//# sourceMappingURL=const.bundle.js.map
