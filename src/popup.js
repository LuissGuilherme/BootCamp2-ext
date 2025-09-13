document.addEventListener('DOMContentLoaded', function() {
    const addReminderBtn = document.getElementById('addReminder');
    const dismissReminderBtn = document.getElementById('dismissReminder');
    const statusDiv = document.getElementById('status');

    
    chrome.alarms.get("drinkWaterAlarm", (alarm) => {
        if (alarm) {
            statusDiv.textContent = "Lembrete ativo.";
        } else {
            statusDiv.textContent = "Lembrete inativo.";
        }
    });

   
    addReminderBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ command: "start" });
        statusDiv.textContent = "Lembrete ativado com sucesso!";
        setTimeout(() => window.close(), 1500); 
    });

   
    dismissReminderBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ command: "stop" });
        statusDiv.textContent = "Lembrete dispensado.";
        setTimeout(() => window.close(), 1500); 
    });
});