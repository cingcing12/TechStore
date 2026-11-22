# TechStore - Modern E-Commerce Frontend

A clean, minimalist E-Commerce frontend built with **React.js**, **Tailwind CSS**, and **Vite**, fully compliant with every functional requirement in the specification, featuring skeleton loading animations, an interactive hero slider, and automated deployment via **GitHub Actions**.

---

## Specification Compliance

| Task | Requirement | Implementation |
| :--- | :--- | :--- |
| **Exercise 1** | **Display 4 Products** | • **Laptop**: $650<br>• **Mouse**: $15<br>• **Keyboard**: $25<br>• **Monitor**: $120<br>Includes high-resolution imagery, technical specs, search, and category filtering. |
| **Exercise 1** | **Add to Cart Button** | Interactive button on all product cards and quick view modals with dynamic quantity badge increments. |
| **Exercise 1** | **Shopping Cart Page** | • **View Cart**: Detailed breakdown with thumbnail and specs.<br>• **Update QTY**: Plus and minus quantity steppers.<br>• **Remove QTY**: Item deletion and cart reset.<br>• **Calculate Subtotal & Grand Total**: Real-time pricing with promo coupon support (`SAVE10`, `WELCOME20`).<br>• **Proceed to Checkout Button**: Step transition to checkout. |
| **Exercise 2** | **Checkout Form & Validation** | • **Customer Data**: First name, Last name, Email, Phone number, and Address (Street, City, State, Zip).<br>• **Validation**: Real-time inline field validation and error alerts.<br>• **Shipping Method Selection**: Standard ($0), Express ($15), and VIP Overnight ($25).<br>• **Order Summary & Grand Total**: Real-time breakdown in a sticky sidebar card.<br>• **Place Order Button**: Submits order with processing state. |
| **Exercise 3** | **Order Confirmation** | • **Message**: Order Placed Successfully!<br>• **Order ID**: `ORD-0001`<br>• **Customer Name**: Customer's full name<br>• **Order Date**: Localized timestamp<br>• **Ordered Products**: Itemized list with thumbnails & quantities<br>• **Total Amount**: Grand total paid<br>• **Order Status**: `Pending` status badge + timeline tracker |

---

## UI/UX Highlights

- **Hero Slider**: Interactive carousel with slide transitions, autoplay, pause-on-hover, slide dots, and navigation arrows.
- **Skeleton Shimmer Animation**: Realistic shimmer placeholder cards while products load.
- **Iconography**: 100% clean vector icons powered exclusively by the `lucide-react` library.
- **Clean Aesthetic**: Minimalist, human-crafted design with subtle borders, neutral palette, and modern typography.
- **Printable Invoice**: Instant print or save to PDF on the order confirmation screen.

---

## Project Structure

```text
E-Commerce_Project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for automated GitHub Pages hosting
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                  # Navigation bar with cart badge
│   │   │   ├── HeroSlider.jsx              # Product carousel slider
│   │   │   ├── SkeletonCard.jsx            # Skeleton shimmer loader card
│   │   │   ├── ProductCard.jsx             # Product card with Add to Cart
│   │   │   ├── ProductList.jsx             # Catalog view, category tabs, and search
│   │   │   ├── CartPage.jsx                # Shopping cart and order calculations
│   │   │   ├── CheckoutPage.jsx            # Validated customer form and shipping
│   │   │   ├── OrderConfirmationPage.jsx   # Order confirmation screen (ORD-0001)
│   │   │   ├── ProductQuickViewModal.jsx   # Quick view hardware specifications modal
│   │   │   └── Toast.jsx                   # Notification toasts
│   │   ├── data/
│   │   │   └── products.js                 # 4 products dataset & shipping options
│   │   ├── utils/
│   │   │   └── confetti.js                 # Lightweight canvas particle effect
│   │   ├── App.jsx                         # Main application state orchestrator
│   │   ├── index.css                       # Tailwind directives & skeleton shimmer
│   │   └── main.jsx                        # React root entry
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js                      # Configured with base: './'
├── .gitignore
├── package.json
└── README.md
```

---

## Local Development

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## GitHub Pages Deployment

The repository includes a ready-to-use GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push to your GitHub repository:
   ```powershell
   git add .
   git commit -m "feat: updated clean UI with hero slider and skeleton loading"
   git push -u origin main
   ```

2. In GitHub, go to **Settings** > **Pages** > **Source** > Select **GitHub Actions**.

3. The workflow builds `./frontend` and deploys to:
   ```
   https://<username>.github.io/<repository-name>/
   ```
