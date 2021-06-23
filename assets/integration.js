$(document).ready(function () {
  const mp = new MercadoPago("APP_USR-7eb0138a-189f-4bec-87d1-c0504ead5626");
  const payButtom = document.querySelector("#pay-button");

  if (payButtom) {
    let preferenceId = payButtom.dataset.preference;
    mp.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#pay-button",
        label: "Pagar la compra",
      },
    });
  }
});
