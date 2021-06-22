const mercadopago = require("mercadopago");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
mercadopago.configure({
  access_token: ACCESS_TOKEN,
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
        name: "Rolando",
        surname: "Gual",
        email: "rolandogual@googlemail.com",
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
    console.log(preference);
    return {
      preferenceId: preference.body.id,
      init_point: preference.body.init_point,
    };
  }
}

module.exports = new MercadoPagoService();
