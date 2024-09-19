// Example: Toggle active state on footer links
const footerLinks = document.querySelectorAll('.footer-link');

footerLinks.forEach(link => {
    link.addEventListener('click', function() {
        footerLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});
