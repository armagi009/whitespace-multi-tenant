import { useCallback } from 'react';

export const useStripeSession = () => {
  const createCheckoutSession = useCallback(async (priceId: string) => {
    // Mock network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Redirect to success page with mock session
    // In a real app, this would call your backend to get a Stripe URL
    // Here we simulate the Stripe "success_url" return
    window.location.hash = `/stripe/success?priceId=${priceId}&session_id=cs_test_mock_${Date.now()}`;
  }, []);

  return { createCheckoutSession };
};