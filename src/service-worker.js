
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extensão Lembrete para Beber Água instalada.');
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "start") {
        // Cria um alarme que dispara a cada 2 horas 
        chrome.alarms.create("drinkWaterAlarm", {
            delayInMinutes: 1,
            periodInMinutes: 1
        });
    } else if (request.command === "stop") {
        // Limpa o alarme
        chrome.alarms.clear("drinkWaterAlarm");
    }
    sendResponse(true);
});


chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "drinkWaterAlarm") {
        // Cria uma notificação no desktop
        chrome.notifications.create("drinkWaterNotif", {
            type: "basic",
            iconUrl: "images/icon128.png",
            title: "Hora de Beber Água!",
            message: "Uma pequena pausa para se hidratar.",
            priority: 2
        });
    }
});