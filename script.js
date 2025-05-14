// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
    document.body.classList.toggle('no-scroll');
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        dots[i].classList.remove('active');
        if(i === index) {
            testimonial.classList.add('active');
            dots[i].classList.add('active');
        }
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Contact Form Validation
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.classList.add('btn-loading');

    // Simple validation
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Name validation
    if(name.value.trim() === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').style.display = 'block';
        name.classList.add('error');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Valid email is required';
        document.getElementById('emailError').style.display = 'block';
        email.classList.add('error');
        isValid = false;
    }

    // Message validation
    if(message.value.trim() === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        document.getElementById('messageError').style.display = 'block';
        message.classList.add('error');
        isValid = false;
    }

    if(isValid) {
        // Simulate form submission
        setTimeout(() => {
            form.reset();
            successMessage.style.display = 'block';
            btn.classList.remove('btn-loading');
            setTimeout(() => successMessage.style.display = 'none', 3000);
        }, 1000);
    } else {
        btn.classList.remove('btn-loading');
    }
});

// FAQ Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');

        item.classList.toggle('active');
        content.classList.toggle('active');
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');

        // Close other items
        accordionHeaders.forEach(otherHeader => {
            if(otherHeader !== header) {
                const otherItem = otherHeader.parentElement;
                const otherContent = otherHeader.nextElementSibling;
                const otherIcon = otherHeader.querySelector('i');
                otherItem.classList.remove('active');
                otherContent.classList.remove('active');
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            }
        });
    });
});

// Responsive Navigation Close on Click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.classList.remove('no-scroll');
        }
    });
});