// Example: Toggle active state on footer links
const footerLinks = document.querySelectorAll('.footer-link');

footerLinks.forEach(link => {
    link.addEventListener('click', function() {
        footerLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const consultButtons = document.querySelectorAll('.consult-button');
    const closeDialogButton = document.getElementById('closeDialog');
    const dialog = document.getElementById('dialog');
    const sendQueryButton = document.getElementById('sendQuery');
    const queryTextArea = document.getElementById('query');

    consultButtons.forEach(button => {
        button.addEventListener('click', () => {
            dialog.style.display = 'flex';
        });
    });

    closeDialogButton.addEventListener('click', () => {
        dialog.style.display = 'none';
    });

    sendQueryButton.addEventListener('click', () => {
        const query = queryTextArea.value.trim();
        if (query) {
            alert('Query sent: ' + query); // You can replace this with actual query handling code
            queryTextArea.value = ''; // Clear the textarea
            dialog.style.display = 'none';
        } else {
            alert('Please enter a query.');
        }
    });

    // Close dialog when clicking outside of the dialog content
    window.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.style.display = 'none';
        }
    });
});

