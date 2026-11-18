
/*
  VILNIAUS TRAŠKIS
  Rygos g. 43
  Darbuotojų PUSH pranešimai
*/

// Gaunamas PUSH pranešimas
self.addEventListener("push", (event) => {

  const title = "🔔 Vilniaus Traškis";

  const options = {
    body: "Naujas apmokėtas užsakymas! Rygos g. 43.",
    data: {
      url: "/darbuotojai.html"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );

});

// Paspaudus pranešimą atidaromi užsakymai
self.addEventListener("notificationclick", (event) => {

  event.notification.close();

  const url = new URL(
    "/darbuotojai.html",
    self.location.origin
  ).href;

  event.waitUntil((async () => {

    const windows = await clients.matchAll({
      type: "window",
      includeUncontrolled: true
    });

    for (const windowClient of windows) {
      if (windowClient.url === url) {
        await windowClient.focus();
        return;
      }
    }

    await clients.openWindow(url);

  })());

});
