document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu on link click
    document.querySelectorAll('#navLinks a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Sticky Header
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const top = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Pricing Tabs
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingContents = {
        'trading-bot': document.getElementById('trading-bot-plans'),
        'forex-vps': document.getElementById('forex-vps-plans')
    };
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const planType = this.getAttribute('data-plan');
            pricingTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            Object.keys(pricingContents).forEach(key => {
                pricingContents[key].style.display = (key === planType) ? 'block' : 'none';
            });
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const isOpen = this.classList.contains('active');
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });
            if (!isOpen) {
                this.classList.add('active');
                const answer = this.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Payment Modal
    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    const selectedService = document.getElementById('selected-service');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentDetails = document.querySelectorAll('.payment-details');
    const copyButtons = document.querySelectorAll('.copy-btn');
    const confirmPaymentLink = document.getElementById('confirmPayment');

    // Open payment modal only for buttons with data-plan
    pricingButtons.forEach(button => {
        const plan = button.getAttribute('data-plan');
        if (!plan) return;

        button.addEventListener('click', function (e) {
            e.preventDefault();
            let serviceText = '';
            switch (plan) {
                case 'starter':
                case 'professional':
                    serviceText = '$299';
                    break;
                case 'vps-pro':
                    serviceText = '$12';
                    break;
            }
            selectedService.textContent = serviceText;
            paymentModal.style.display = 'flex';
            document.body.classList.add('no-scroll');
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    });

    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });

    // Switch between payment methods
    paymentMethods.forEach(method => {
        method.addEventListener('click', function () {
            const methodType = this.getAttribute('data-method');
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            paymentDetails.forEach(detail => {
                detail.style.display = (detail.id === `${methodType}Details`) ? 'block' : 'none';
            });
        });
    });

    // Copy wallet/UPI address
    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const address = this.getAttribute('data-address');
            navigator.clipboard.writeText(address).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            });
        });
    });

    // Confirm payment
    confirmPaymentLink.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Please send your payment receipt to pybanger@gmail.com or contact @pybanger on Telegram for activation.');
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
            this.reset();
        });
    }

    // Scroll animation
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Back to top
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function () {
        backToTopButton.classList.toggle('show', window.pageYOffset > 300);
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.style.display = (i === index) ? 'block' : 'none';
        });
    }
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    showTestimonial(0);
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    .feature-card, .pricing-card, .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .feature-card.animate, .pricing-card.animate, .testimonial-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: var(--box-shadow);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    .back-to-top:hover {
        background-color: var(--primary-dark);
        transform: translateY(-3px);
    }
    .no-scroll {
        overflow: hidden;
    }
    .modal {
        animation: fadeIn 0.3s;
    }
`;
document.head.appendChild(style);
