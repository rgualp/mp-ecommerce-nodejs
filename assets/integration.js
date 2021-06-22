$(document).ready(function () {
  const mp = new MercadoPago("TEST-521ec975-0026-4e0d-9182-1e08202abc89");
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
