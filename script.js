const menuData = [
    {
        id: 1,
        title: "Truffle Arancini",
        category: "starters",
        price: "$14",
        description: "Crispy risotto balls infused with black truffle, served with garlic aioli and parmesan dust."
    },
    {
        id: 2,
        title: "Burrata & Heirloom",
        category: "starters",
        price: "$18",
        description: "Fresh Italian burrata, heirloom tomatoes, basil crisp, and aged balsamic reduction."
    },
    {
        id: 3,
        title: "Wagyu Carpaccio",
        category: "starters",
        price: "$22",
        description: "Thinly sliced wagyu beef, caper berries, micro arugula, and lemon-infused olive oil."
    },
    {
        id: 4,
        title: "Miso Glazed Black Cod",
        category: "mains",
        price: "$42",
        description: "Pan-seared black cod, sweet miso glaze, bok choy, and ginger emulsion."
    },
    {
        id: 5,
        title: "Truffle Mushroom Risotto",
        category: "mains",
        price: "$34",
        description: "Carnaroli rice, wild mushrooms, mascarpone, finished with fresh truffle shavings."
    },
    {
        id: 6,
        title: "Dry-Aged Ribeye",
        category: "mains",
        price: "$65",
        description: "14oz prime cut, roasted bone marrow, charred asparagus, and green peppercorn sauce."
    },
    {
        id: 7,
        title: "Dark Chocolate Dome",
        category: "desserts",
        price: "$16",
        description: "Valrhona chocolate mousse, hazelnut praline center, warm caramel pour."
    },
    {
        id: 8,
        title: "Lemon Basil Tart",
        category: "desserts",
        price: "$14",
        description: "Zesty lemon curd, sweet basil meringue, and blackberry coulis."
    },
    {
        id: 9,
        title: "Signature Espresso Martini",
        category: "drinks",
        price: "$18",
        description: "Premium vodka, fresh cold brew, coffee liqueur, vanilla bean."
    },
    {
        id: 10,
        title: "Smoked Old Fashioned",
        category: "drinks",
        price: "$20",
        description: "Bourbon, maple syrup, orange bitters, smoked with hickory wood."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Function to render menu items
    function renderMenu(items) {
        // First fade out existing items if there are any
        const existingItems = menuContainer.querySelectorAll('.menu-item');
        if (existingItems.length > 0) {
            existingItems.forEach(item => item.classList.add('fade-out'));
            
            setTimeout(() => {
                injectItems(items);
            }, 300); // match CSS transition duration
        } else {
            injectItems(items);
        }
    }

    function injectItems(items) {
        menuContainer.innerHTML = '';
        items.forEach(item => {
            const menuItemHTML = `
                <div class="menu-item">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.title}</h3>
                        <span class="menu-item-price">${item.price}</span>
                    </div>
                    <p class="menu-item-desc">${item.description}</p>
                </div>
            `;
            menuContainer.insertAdjacentHTML('beforeend', menuItemHTML);
        });
        
        // Ensure entrance animation plays
        const newItems = menuContainer.querySelectorAll('.menu-item');
        newItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            
            // Request animation frame to ensure display:block has applied before animating opacity
            requestAnimationFrame(() => {
                setTimeout(() => {
                    item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            });
        });
    }

    // Initial render
    renderMenu(menuData);

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            
            if (category === 'all') {
                renderMenu(menuData);
            } else {
                const filteredData = menuData.filter(item => item.category === category);
                renderMenu(filteredData);
            }
        });
    });

    // Add scroll shrink effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
    
    // Trigger reveal for elements already in viewport on load
    setTimeout(() => {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('active');
            }
        });
    }, 100);
});
