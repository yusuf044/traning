const BASE_URL = 'https://www.dentalkart.com/';
export const FEEDS_API_BASE_URL = 'https://feeds-prod.dentalkart.com';
export const PRODUCT_IMAGE_URL =
  'https://images.dentalkart.com/media/catalog/product';
const SERVERLESS_BASE_URL = 'https://serverless-prod.dentalkart.com';
export const X_API_KEY = 'ZFobrRyccnTyXyXHPUVO4eyyKEKoSjWB';

const API = {
  checkout: {
    estimate_shipping_methods: `${BASE_URL}rest/default/V1/carts/mine/estimate-shipping-methods`,
    set_estimate_shipping_methods: cart_id =>
      `${BASE_URL}rest/V1/guest-carts/${cart_id}/estimate-shipping-methods`,
    set_shipping_information: cart_id =>
      `${BASE_URL}rest//V1/guest-carts/${cart_id}/shipping-information`,
    set_shipping_and_billing_information: `${BASE_URL}rest/default/V1/carts/mine/dk-shipping-information`,
    send_payment_information: `${BASE_URL}rest/default/V1/carts/mine/dt-payment-information`,
    order_success: `${BASE_URL}rest/V1/checkout/order/success`,
    razorpay: `${BASE_URL}rest/V1/razorpay/payment/order`,
  },
  validateFields: `${BASE_URL}rest/V1/mobileapp/directory/checkOptionalFields`,
  featureProductList: `${SERVERLESS_BASE_URL}/api/v1/products/list`,
};

export default API;
