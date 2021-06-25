const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
  corporation_id: "469485398"
});

const HOST = "https://rgualp-mp-commerce-nodejs.herokuapp.com";
class MercadoPagoService {
  async createPreference(data) {
    let urlImg = data?.img?.slice(1);
    let preference = await mercadopago.preferences.create({
      items: [
        {
          title: data.title,
          picture_url: `${HOST}${urlImg}`,
          description: "Dispositivo móvil de Tienda e-commerce",
          quantity: 1,
          unit_price: parseFloat(data.price),
        },
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_63274575@testuser.com",
        phone: {
          area_code: "11",
          number: 22223333,
        },
        address: {
          street_name: "Falsa",
          street_number: 123,
          zip_code: "1111",
        },
      },
      back_urls: {
        success: `${HOST}/success`,
        failure: `${HOST}/failure`,
        pending: `${HOST}/pending`,
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
      notification_url: `${HOST}/hooks`,
      external_reference: "rolandogual@gmail.com",
    });
    return {
      preferenceId: preference.body.id,
      init_point: preference.body.init_point,
    };
  }
}

module.exports = new MercadoPagoService();
