'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function PaymentPage() {
  const [loaded, setLoaded] = useState(false);
  const paypalRef = useRef(null);

  useEffect(() => {
    if (loaded && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '20.00' // dummy amount
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`✅ Payment Successful! Thank you, ${details.payer.name.given_name}`);
          });
        },
        onError: (err) => {
          alert('❌ Payment failed. Check console.');
          console.error(err);
        }
      }).render(paypalRef.current);
    }
  }, [loaded]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">💳 Pay with PayPal (Sandbox)</h1>

      {/* ✅ Load PayPal SDK */}
      <Script
  src="https://www.paypal.com/sdk/js?client-id=ARd1sM1K8BHNS5vQtOkgenzmXKR14GFmaqNFxWJJ06AfICLPtK4MW43OJnBlZeU8E9ord2AyYZgS__US&components=buttons"
  strategy="afterInteractive"
  onLoad={() => setLoaded(true)}
/>


      {/* ✅ PayPal button renders here */}
      <div ref={paypalRef} />
    </div>
  );
}