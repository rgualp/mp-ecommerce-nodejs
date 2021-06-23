$(document).ready(function () {
  const ws = new WebSocket("ws://rgualp-mp-commerce-nodejs.herokuapp.com/ws");
  const options = {
    settings: {
      duration: 5000,
    }
};
  ws.onopen = function (event) {
    console.log("WebSocket open");
  };
  ws.onerror = (error) => {
    console.log(`WebSocket error: ${error}`);
  };

  ws.onmessage = (e) => {
    iqwerty.toast.toast(`Recived webhooks Notification: ${e.data}`, options);
  };
});
