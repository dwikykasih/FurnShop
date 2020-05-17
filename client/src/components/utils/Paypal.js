import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class Paypal extends React.Component {
    render() {
        const onSuccess = (payment) => {
            console.log("Pembayaran berhasil", payment);
                    this.props.onSuccess(payment)
        }
 
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
            }
 
        const onError = (err) => {
            console.log("Error!", err);
           }
 
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total = this.props.total; 
        const client = {
            sandbox:    'AaML7Qa8wpe03LT96_eCbs5YHZxTROnRL_kqN3RdQoyHQXS539Gy1oyeBqJykRYy77FfFR391RBGOAlo',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} style={{size: 'large', color:'blue', shape:'rect', label:'checkout'}}/>
        );
    }
}