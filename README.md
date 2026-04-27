# Amazon Automation Assignment (Playwright)

## 📌 Overview

This project automates product search and cart operations on Amazon using Playwright.

The implementation focuses on:

- Reliability on dynamic UI (Amazon)
- Parallel execution
- Clean architecture
- Real-world automation challenges

---

## ✅ Test Scenarios

### TC01 - Search iPhone and Add to Cart

- Navigate to Amazon
- Search for "iPhone"
- Extract product price
- Add product to cart
- Print price in console

### TC02 - Search Samsung Galaxy and Add to Cart

- Navigate to Amazon
- Search for "Samsung Galaxy"
- Extract product price
- Add product to cart
- Print price in console

---

## ⚙️ Tech Stack

- Playwright (JavaScript)
- Node.js
- Git & GitHub
- LambdaTest (Cloud Execution)

---

## 📁 Project Structure

```
amazon-automation/
│
├── tests/
│   ├── iphone.spec.js
│   ├── galaxy.spec.js
│   └── utils.js
│
├── playwright.config.js                # Local execution
├── playwright.lambdatest.config.js     # Cloud execution
├── package.json
├── README.md
```

---

# 🚀 How to Run the Project

## 1️⃣ Prerequisites

Ensure you have installed:

- Node.js (v18+ recommended)
- Git
- VS Code or any IDE

---

## 2️⃣ Clone the Repository

```
git clone https://github.com/<your-username>/amazon-automation-playwright.git
cd amazon-automation-playwright
```

---

## 3️⃣ Install Dependencies

```
npm install
```

---

## 4️⃣ Install Playwright Browsers

```
npx playwright install
```

---

## ▶️ Run Tests Locally

```
npx playwright test
```

### Expected Output:

- Both test cases run
- Products are added to cart
- Prices printed in console

---

## ⚡ Parallel Execution

Parallel execution is enabled via:

```
workers: 2
fullyParallel: true
```

Each test runs in:

- Separate browser context
- Independent session (avoids cart conflicts)

---

## ☁️ Run on LambdaTest Cloud (Bonus)

### Step 1: Get Credentials

Sign up at LambdaTest and get:

- Username
- Access Key

---

### Step 2: Set Environment Variables

**Windows (PowerShell):**

```
$env:LT_USERNAME="your_username"
$env:LT_ACCESS_KEY="your_access_key"
```

---

### Step 3: Run Tests on Cloud

```
npx playwright test --config=playwright.lambdatest.config.js
```

---

### Expected:

- Tests run on remote browsers
- Parallel execution on cloud
- Results visible on LambdaTest dashboard

---

# 🧠 Key Implementation Decisions

## 1. Handling Dynamic Amazon UI

Amazon has:

- Dynamic DOM
- Lazy-loaded elements
- Non-interactable visible buttons

Solution:

- Used robust selectors
- Validated element interactability (not just visibility)
- Avoided brittle locators

---

## 2. Reliable Add-to-Cart Strategy

Challenge:

- Some listings show “Add to Cart”
- Others show “See Options”

Solution:

- Prioritized actionable buttons on search page
- Ensured element is interactable before clicking

---

## 3. Avoiding Flaky Tests

Avoided:

- Hardcoded delays (`waitForTimeout`)

Used:

- State-based waits (`waitForSelector`, `waitForFunction`)

---

## 4. Parallel Execution Handling

Challenge:

- Amazon blocks shared sessions

Solution:

- Used isolated browser contexts:

```
browser.newContext()
```

Result:

- True parallel execution
- No session conflicts

---

## 5. Cloud Execution (LambdaTest)

Implemented:

- WebSocket-based remote browser connection
- Playwright integration with LambdaTest

Benefit:

- Scalable testing
- Cross-browser validation

---

# ⚠️ Challenges Faced

### 1. Add-to-Cart Not Working

- Visible button was not interactable
- Solved using proper selector refinement and interaction checks

---

### 2. Parallel Execution Conflicts

- Shared cart caused failures
- Solved using isolated browser contexts

---

### 3. Dynamic DOM Behavior

- Elements changed during runtime
- Solved using resilient locators and retries

---

### 4. LambdaTest Configuration Issues

- Incorrect browser capability (`chromium`)
- Fixed by using `pw-chromium`

---

# 🎯 What This Demonstrates

- Strong understanding of UI automation
- Ability to handle real-world flaky systems
- Knowledge of parallel execution strategies
- Experience with cloud testing platforms
- Clean and maintainable test architecture

---

# 📌 Output

Example console logs:

```
🛒 Added from search page
✅ iPhone → Price: ₹79,900

🛒 Added from search page
✅ Samsung Galaxy → Price: ₹21,999
```

---

# 🏁 Conclusion

This solution is designed to be:

- Reliable
- Scalable
- Maintainable

and closely reflects real-world automation practices.
