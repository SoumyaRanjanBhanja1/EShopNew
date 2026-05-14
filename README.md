Install server dependencies:
----------------------------

inside terminal cmd enter following commands to install required dependencies for server side
cd backend
npm install


Install client dependencies:
----------------------------

inside terminal cmd enter following commands to install required dependencies for client side
cd ../frontend
npm install

create backend directory and add .env file and add follwing details:
--------------------------------------------------------------------

PORT=5000 (example)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
OTP_SERVICE_SID=your_otp_provider_sid


Run the application:
--------------------

# Start backend
npm run dev

# Start frontend
npm run dev


🏗️ Architecture & Workflow
Authentication Flow: User enters phone/email -> Backend generates OTP -> OTP validated -> JWT token issued and stored in HTTP-only cookies.

State Management: Redux slices handle auth, cart, products, and checkout. Actions are dispatched on user interactions, minimizing redundant API calls.

Checkout Flow: Cart finalized -> Backend creates Razorpay order -> Frontend opens Razorpay modal -> Payment successful -> Webhook verifies signature -> Order status updated in MongoDB.


Defining the README Scope

I've established the README's core purpose and scope for the e-shopping app, focusing on key features and tech context.

Refining the Content

I'm now drafting the README's structure and core content, including a compelling description and tech stack.

Install server dependencies:

Bash
cd backend
npm install
Install client dependencies:

Bash
cd ../frontend
npm install
Set up environment variables:
Create a .env file in the backend directory and add the following:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
OTP_SERVICE_SID=your_otp_provider_sid
Run the application:

Bash
# From the root directory (if using concurrently), or separately:
# Start backend
npm run dev

# Start frontend
npm run dev
🏗️ Architecture & Workflow
Authentication Flow: User enters phone/email -> Backend generates OTP -> OTP validated -> JWT token issued and stored in HTTP-only cookies.

State Management: Redux slices handle auth, cart, products, and checkout. Actions are dispatched on user interactions, minimizing redundant API calls.

Checkout Flow: Cart finalized -> Backend creates Razorpay order -> Frontend opens Razorpay modal -> Payment successful -> Webhook verifies signature -> Order status updated in MongoDB.

🔮 Future Enhancements
AI-based product recommendation engine.

Multi-language and multi-currency support.



👤 Author
Soumya Ranjan Bhanja
Full Stack Mern Developer





