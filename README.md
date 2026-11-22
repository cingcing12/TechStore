# 🛒 TechStore - Next-Gen E-Commerce Frontend

An ultra-modern, high-performance E-Commerce frontend built with **React.js**, **Tailwind CSS**, and **Vite**, fully compliant with every requirement in the assignment specification (**លំហាត់អនុវត្ត.pdf**), plus enhanced UX/UI and continuous deployment via **GitHub Actions**.

---

## 📋 PDF Requirements Compliance Matrix

| PDF Task / Slide | Requirement in PDF | Implementation Status | Features & Enhancements |
| :--- | :--- | :---: | :--- |
| **Exercise 1 (Page 1)** | **1. បង្ហាញផលិតផលទាំង ៤ (Display 4 Products)** | ✅ 100% | • **Laptop**: $650<br>• **Mouse**: $15<br>• **Keyboard**: $25<br>• **Monitor**: $120<br>High-resolution imagery, specifications, rating stars, search & category filtering. |
| **Exercise 1 (Page 1)** | **2. បង្កើតប៊ូតុង Add to Cart (Add to Cart Button)** | ✅ 100% | Interactive button with state change, animation, badge counter increment, and toast notification. |
| **Exercise 1 (Page 1)** | **3. Create Page Shopping Cart** | ✅ 100% | • **View Cart**: Detailed breakdown with thumbnail, category, specifications.<br>• **Update QTY**: `+` and `-` quantity steppers.<br>• **remove QTY**: Instant item removal & trash icon.<br>• **Calculate Subtotal & Grand Total**: Real-time math with promo discount support (`SAVE10`, `WELCOME20`).<br>• **Create BTN Proceed to Checkout**: Direct step transition. |
| **Exercise 2 (Page 2 & 3)** | **Practical Exercise Checkout** | ✅ 100% | **Customer Form fields:**<br>1. First name<br>2. Last Name<br>3. Email<br>4. Phone Number<br>5. Address (Street, City, State, Zip)<br>6. **Validate Required Fields** (real-time error alerts, empty/format checks)<br>7. **Shipping Method** (Free Ground $0, Express $15, VIP $25)<br>8. **Display Order Summary** (live sticky sidebar)<br>9. **Calculate Grand Total** (Subtotal + Shipping + Taxes - Discount)<br>10. **Create Place Order Button** |
| **Exercise 3 (Slide 28)** | **Order Confirmation** | ✅ 100% | Triggered after placing order with confetti celebration:<br>• **Message**: *Order Placed Successfully!*<br>• **Order ID**: `ORD-0001` (dynamically generated)<br>• **Customer Name**: Displays first & last name<br>• **Order Date**: Localized timestamp<br>• **Ordered Products**: Full itemized list with unit price and quantities<br>• **Total Amount**: Grand total breakdown<br>• **Order Status**: `Pending` badge + 4-step fulfillment timeline |
| **Database Design (Page 4)** | **Interactive ERD Diagram** | ✅ Bonus | Interactive modal with visual ERD diagram and complete SQL DDL schema for the 5 required tables:<br>1. `Customers`<br>2. `Categories`<br>3. `Products`<br>4. `Orders`<br>5. `Order_Items` |

---

## 🚀 Key UX/UI Enhancements

- **Modern Glassmorphic Header**: Sticky navigation with live cart count, subtotal preview, quick search, and step progress tracker (`1. Products -> 2. Cart -> 3. Checkout -> 4. Confirmation`).
- **Quick View Modal**: Click any product to inspect full hardware specifications, select quantities, and add to cart without leaving the view.
- **Promo Coupon System**: Test discounts with codes `SAVE10` (10% off) or `WELCOME20` (20% off).
- **Celebratory Confetti Effect**: Pure canvas confetti celebration upon order completion.
- **Printable Invoice**: 1-click printable receipt for customers and instructors.
- **Responsive Design**: Flawlessly optimized across mobile phones, tablets, and desktop displays.

---

## 📁 Project Structure

```text
E-Commerce_Project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for automated GitHub Pages hosting
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                  # Header with search, cart badge, navigation
│   │   │   ├── ProductCard.jsx             # Product card with Add to Cart button
│   │   │   ├── ProductList.jsx             # Hero banner, category tabs, product grid
│   │   │   ├── CartPage.jsx                # Shopping cart, QTY steppers, summary
│   │   │   ├── CheckoutPage.jsx            # Validated customer form & shipping method
│   │   │   ├── OrderConfirmationPage.jsx   # Slide 28 confirmation with ORD-0001
│   │   │   ├── DatabaseERDModal.jsx        # Slide 29 ERD diagram & SQL DDL
│   │   │   ├── ProductQuickViewModal.jsx   # Detailed spec viewer
│   │   │   └── Toast.jsx                   # Notification toasts
│   │   ├── data/
│   │   │   └── products.js                 # 4 PDF products data & Database ERD schema
│   │   ├── utils/
│   │   │   └── confetti.js                 # Canvas confetti animation
│   │   ├── App.jsx                         # Main application state orchestrator
│   │   ├── index.css                       # Tailwind directives & custom animations
│   │   └── main.jsx                        # React root entry
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js                      # Configured with base: './' for GitHub Pages
├── .gitignore
├── package.json
└── README.md
```

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or pnpm

### Quick Start

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

5. To build for production:
   ```bash
   npm run build
   ```
   The optimized production assets will be generated in `frontend/dist/`.

---

## 🌐 Deploying to GitHub Pages with GitHub Actions

The repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Step-by-Step Instructions:

1. **Initialize Git & Push to your GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete e-commerce frontend matching PDF spec with GitHub Actions"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages via Actions**:
   - Go to your repository on GitHub.
   - Click on **Settings** (top tab).
   - In the left sidebar, click on **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.

3. **Automatic Deployment**:
   - Every time you push to the `main` or `master` branch, GitHub Actions will automatically:
     1. Check out your code.
     2. Install dependencies via `npm ci`.
     3. Run `npm run build` in `./frontend`.
     4. Deploy `./frontend/dist` directly to GitHub Pages.
   - Your live website will be accessible at:
     ```
     https://<your-username>.github.io/<your-repo-name>/
     ```

*(Note: `vite.config.js` is set to `base: './'`, ensuring that all CSS, JS, and image assets load with relative paths regardless of repository sub-paths on GitHub Pages).*

---

## 🎓 PDF Assignment Reference (Khmer / English)

- **Practical Exercise 1**:
  - បង្ហាញផលិតផលទាំង ៤ (Laptop $650, Mouse $15, Keyboard $25, Monitor $120)
  - បង្កើតប៊ូតុង Add to Cart
  - Create Page Shopping Cart (View Cart, Update QTY, Remove QTY, Calculate Subtotal & Grand Total, BTN Proceed to Checkout)
- **Practical Exercise Checkout**:
  - Customer data form (First name, Last Name, Email, Phone Number, Address, Validate Required Fields, Shipping Method, Order Summary, Calculate Grand Total, Place Order Button)
- **Order Confirmation (Slide 28)**:
  - បន្ទាប់ពីអតិថិជនចុច Place Order ប្រព័ន្ធត្រូវបង្ហាញ៖ Message: Order Placed Successfully!, Order ID: ORD-0001, Customer Name, Order Date, Ordered Products, Total Amount, Order Status: Pending.
- **Database Design (Page 4)**:
  - ERD បង្ហាញទំនាក់ទំនងរវាង Tables ទាំង 5 (Customers, Categories, Products, Orders, Order_Items).
