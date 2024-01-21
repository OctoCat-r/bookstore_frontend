import axios from "axios";

const checkoutHandler = async (amount) => {
  const {
    data: { key },
  } = await axios.get(
    // "http://localhost:4000/api/razorpay/getkey"
    "https://book-store-backend-roan.vercel.app/api/razorpay/getkey"
  );
  const {
    data: { order },
  } = await axios.post(
    // "http://localhost:4000/api/razorpay/orders",
    "https://book-store-backend-roan.vercel.app/api/razorpay/orders",
    { amount }
  );
  console.log(window);
  const options = {
    key,
    amount: order.amount,
    currency: "INR",
    name: "Aman Jain",
    description: "Razorpay tutorial",
    image:
      "https://i.pinimg.com/originals/95/f8/58/95f8588d6469a16271ea2d2fad419d00.png",
    order_id: order.id,
    callback_url:
      // "http://localhost:4000/api/razorpay/payment-callback/",
      "https://book-store-backend-roan.vercel.app/api/razorpay/payment-callback",
    prefill: {
      name: "Aman Jain",
      email: "amangodha26@gmail.com",
      contact: "7062412000",
    },
    notes: {
      address: "razorapy official",
    },
    theme: {
      color: "#3399cc",
    },
  };
  const razor = new window.Razorpay(options);
  razor.open();
};
export default checkoutHandler;
