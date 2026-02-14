import { loadStripe } from '@stripe/stripe-js';

// Stripe TEST publishable key — safe for client-side.
// Replace with your own key from https://dashboard.stripe.com/test/apikeys
const STRIPE_PK =
    'pk_test_51OExampleTestKeyReplaceMeWithYourOwnStripePublishableKey00';

let stripePromise = null;

export function getStripe() {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PK);
    }
    return stripePromise;
}

/**
 * Redirect to Stripe Checkout.
 * In a real app, you'd create a Checkout Session on your backend.
 * This demo uses client-only mode with `mode: 'payment'`.
 *
 * NOTE: Client-only checkout requires price IDs from Stripe Dashboard.
 * For the demo we simulate the redirect and show a success message.
 */
export async function redirectToCheckout(cartItems) {
    // Since we don't have a backend or real Stripe price IDs,
    // we'll simulate the checkout experience.
    // In production, you would:
    // 1. POST cart to your server
    // 2. Server creates a Stripe Checkout Session
    // 3. Redirect with session.id
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 2000);
    });
}
