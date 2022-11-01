import { loadScript } from '../utils/loadScript';

const src = 'https://checkout.razorpay.com/v1/payment-button.js';
const id = 'razorpay';
const otherParams = {
    'data-payment_button_id': 'pl_Kaix17EjTo5pVT',
    async: 'async',
};

const RazorPayButton = () => loadScript(src, id, otherParams, 'razorpay-container');

export default RazorPayButton;