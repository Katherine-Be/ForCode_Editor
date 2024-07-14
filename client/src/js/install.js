const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    // Show the install button
    butInstall.style.display = 'block';

});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Hide the install button
    butInstall.style.display = 'none';
    // Log the result
    console.log(`User response to the install prompt: ${outcome}`);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log the event details
    console.log('Jate has been installed!', event);
});
