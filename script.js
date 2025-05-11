document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#navLinks a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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
    tab.addEventListener('click', function() {
        const planType = this.getAttribute('data-plan');
        
        // Update active tab
        pricingTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Show the selected content
        Object.keys(pricingContents).forEach(key => {
            if (key === planType) {
                pricingContents[key].style.display = 'block';
            } else {
                pricingContents[key].style.display = 'none';
            }
        });
    });
});

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isOpen = this.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });
            
            // Toggle current FAQ if it wasn't open
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

    // Open modal when pricing button is clicked
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const plan = this.getAttribute('data-plan');
            let serviceText = '';
            
            switch(plan) {
                case 'starter':
                    serviceText = '$299';
                    break;
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
        method.addEventListener('click', function() {
            const methodType = this.getAttribute('data-method');
            
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            paymentDetails.forEach(detail => {
                detail.style.display = 'none';
                if (detail.id === `${methodType}Details`) {
                    detail.style.display = 'block';
                }
            });
        });
    });

    // Copy wallet/UPI address
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
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
    confirmPaymentLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Here you would typically open a form or redirect to a confirmation page
        alert('Please send your payment receipt to pybanger@gmail.com or contact @pybanger on Telegram for activation.');
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
            
            // Reset the form
            this.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Testimonials Slider (simple version)
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Initialize
    showTestimonial(0);
});

// Add some basic animations
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
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .modal {
        animation: fadeIn 0.3s;
    }
`;
document.head.appendChild(style);