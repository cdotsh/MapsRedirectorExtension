chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) return;

    const statusElement = document.getElementById('status');

    // script to check for the overlay in the active tab
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: () => {
                return !!document.querySelector('.maps-overlay');
            },
        },
        ([result]) => {
            if (result && result.result) {
                statusElement.textContent = 'Redirection overlay applied!';
            } else {
                statusElement.textContent = 'No Google Maps content found on this page.';
            }
        }
    );
});
