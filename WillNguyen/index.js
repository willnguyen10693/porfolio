document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.introduction .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove the active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add the active class to the clicked nav item
            this.classList.add('active');
        });
    });
});

document.querySelector('.social-icon').addEventListener('mouseover', function() {
    document.querySelector('#footer').style.backgroundColor = '#3b5998';
});

document.querySelector('.social-icon').addEventListener('mouseout', function() {
    document.querySelector('#footer').style.backgroundColor = '#333';
});