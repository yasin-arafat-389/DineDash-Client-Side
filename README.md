# DineDash (Client Side)

## Introduction

The **E-Commerce Client** is the frontend application that provides a seamless shopping experience for users. It includes features like product browsing, filtering, comparison, cart management, order placement, and account management. Built with modern web technologies, the client application is responsive and ensures an intuitive user interface.

## Live URL

- **Client Live URL:** [DineDash Client](https://dine-dash-client-side.web.app/)

## Technology Stack & Packages

- **React.js** - JavaScript library for building user interfaces.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Redux Toolkit** - State management solution for managing global state.
- **React Router** - For routing and navigation.
- **Axios** - For handling HTTP requests.
- **React Query** - For data fetching and caching.
- **Firebase** - For authentication and user management.

## Key Features & Functionality

### User Interactions

#### Browse Products

- **Filter:** Search products by category, price range, and keyword for a refined shopping experience.
- **View Details:** Access detailed product descriptions, user ratings, and reviews to make informed purchase decisions.

#### Product Comparison

- **Compare Features:** Compare up to three products within the same category.
- **Attributes:** Includes attributes such as price, ratings, and product descriptions.

#### Cart Management

- **Add to Cart:** Seamlessly add products to the cart directly from product pages.
- **Vendor Restriction Warning:** Alerts users if they attempt to add products from multiple vendors with options to:
  - Replace the cart with the new products.
  - Retain the existing cart.

#### Recent Products

- **Quick Access:** Displays the last 10 recently viewed products.
- **Convenience:** Enables users to revisit products quickly without searching again.

#### Checkout

- **Coupons:** Apply coupon codes for discounts during checkout.
- **Secure Payments:** Integration with **SSLCOMMERZ** for safe and reliable payment processing.

---

### Account Management

#### Authentication

- **Firebase Integration:** Secure login and signup for users.
- **Password Management:** Options to change or reset passwords.

#### Order History

- **Tracking Purchases:** View and track the details of past purchases with ease.
- **Comprehensive Details:** Includes product names, dates, and prices for user reference.

---

## Installation Guideline

### Prerequisites

- Node.js (version 14 or above)
- npm (version 6 or above) or yarn (version 1.22 or above)

### Installation Steps

1. **Clone the repository**

   ```sh
   https://github.com/yasin-arafat-389/DineDash-Client-Side
   ```

   2. **Navigate to the project directory**

   ```sh
   cd DineDash-Client-Side

   ```

   3. **Install the dependencies**

   ```sh
   npm install
   ```

### Configuration

1.  **Replace base URL according to your local machine**

```sh
const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});
```
