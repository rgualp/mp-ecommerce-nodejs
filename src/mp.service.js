const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
});

class MercadoPagoService {
  async createPreference(data) {
    let preference = await mercadopago.preferences.create({
      items: [
        {
          title: data.title,
          picture_url:
            "http://localhost:3000/assets/motorola-moto-g5-plus-1.jpg",
          description: "Descripción del Item",
          quantity: 1,
          unit_price: parseFloat(data.price),
        },
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_63274575@testuser.com",
        identification: {
          type: "CI",
          number: "63650826",
        },
      },
      back_urls: {
        success: "https://rgualp-mp-commerce-nodejs.herokuapp.com/success",
        failure: "https://rgualp-mp-commerce-nodejs.herokuapp.com/failure",
        pending: "https://rgualp-mp-commerce-nodejs.herokuapp.com/pending",
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex",
          },
        ],
        excluded_payment_types: [
          {
            id: "atm",
          },
        ],
        installments: 6,
      },
      notification_url: "https://www.your-site.com/ipn",
      external_reference: "rolandogual@googlemail.com",
    });
    return {
      preferenceId: preference.body.id,
      init_point: preference.body.init_point,
    };
  }
}

module.exports = new MercadoPagoService();
