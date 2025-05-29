import { appConfig } from 'config/appConfig';
import Stripe from 'stripe';
import { deepCopyObject, realMerge } from 'utils';

const stripeSk = appConfig.IS_PROD ? process.env.STRIPE_SK : process.env.STRIPE_SK_TEST;

const stripe = new Stripe(stripeSk as string, {
  apiVersion: '2024-06-20',
  typescript: true,
});

/**
 * [STRIPE CONNECT] use for creating account onboarding or continue onboarding links
 * https://stripe.com/en-pl/connect
 */
export const stripeGetAccountLink = async ({
  stripeAccountId,
  createAccountParams = {},
  createLinkParams,
}: {
  stripeAccountId?: string | null;
  createAccountParams?: Partial<Stripe.AccountCreateParams>;
  createLinkParams: Stripe.AccountLinkCreateParams;
}) => {
  let stripeAccount = null;
  let stripeAccountLink = null;

  if (!stripeAccountId) {
    // start onboarding
    stripeAccount = await stripe.accounts.create(
      realMerge(
        {
          type: 'express', // default
        } as typeof createAccountParams,
        createAccountParams || {}
      ) as typeof createAccountParams
    );

    stripeAccountLink = await stripe.accountLinks.create({
      ...createLinkParams,
      account: stripeAccount.id,
      type: createLinkParams?.type ? createLinkParams?.type : 'account_onboarding', // default
    } as Stripe.AccountLinkCreateParams);
  } else {
    // continue onboarding
    stripeAccount = await stripe.accounts.retrieve(stripeAccountId);

    if (!stripeAccount.charges_enabled && typeof createLinkParams.account === 'string') {
      stripeAccountLink = await stripe.accountLinks.create(
        realMerge(
          {
            type: 'account_onboarding', // default
          } as typeof createLinkParams,
          createLinkParams
        ) as typeof createLinkParams
      );
    } else {
      return await stripeAccountLoginLink({
        stripeAccountId: stripeAccount.id,
      });
    }
  }

  return {
    stripeAccount, //save account or acount.id to user/db
    stripeAccountLink, // navigate user there
  };
};

/**
 * [STRIPE CONNECT] get link to user`s stripe account dashboard. works only if user passed onboarding
 * https://stripe.com/en-pl/connect
 */
export const stripeAccountLoginLink = async ({
  stripeAccountId,
  stripeAccountCreateLoginLinkParams,
}: {
  stripeAccountId?: string | null;
  stripeAccountCreateLoginLinkParams?: Stripe.AccountCreateLoginLinkParams;
}) => {
  if (!stripeAccountId) {
    throw new Error('stripeAccountLoginLink: No stripeAccountId provided, see lib/stripe.ts');
  }

  const stripeAccountLink = await stripe.accounts.createLoginLink(
    stripeAccountId,
    stripeAccountCreateLoginLinkParams
  );

  return { stripeAccount: undefined, stripeAccountLink }; // navigate user there
};

/**
 * [STRIPE BILLING] get a link to billing portal (manage subscriptions, etc)
 * https://stripe.com/en-pl/billing
 */
export const stripeBillingPortal = async (params: Stripe.BillingPortal.SessionCreateParams) => {
  const session = await stripe.billingPortal.sessions.create(params);
  return session;
};

/**
 * Create payment intent. Validate price amount with zod on nextjs API route!
 * https://docs.stripe.com/api/payment_intents/object
 */
export const stripePaymentIntent = async (params: Stripe.PaymentIntentCreateParams) => {
  if (!params.amount) {
    throw new Error('stripePaymentIntent: Amount not set, see lib/stripe.ts');
  }

  const paymentIntent = await stripe.paymentIntents.create(
    realMerge(
      {
        currency: 'usd',
        payment_method_types: ['card', 'link'], // card, blik (only for Polish zloty PLN), link
      } as typeof params,
      params
    ) as typeof params
  );

  return deepCopyObject(paymentIntent);
};

/**
 * if res.status === "succeeded" give access to product, query to db, etc
 * (inside nextjs API  route)
 */
export const stripeGetPaymentIntent = async (paymentIntentId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent;
};

/**
 * https://stripe.com/en-pl/payments/payment-links
 * https://docs.stripe.com/payment-links
 *
 */
export const stripePaymentLink = async (createParams: Stripe.Checkout.SessionCreateParams) => {
  /**
    You can use priceIds created from stripe dashboard, or pass line items without using priceIds:
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 100,
          product_data: {
            name: "Name",
          },
        },
        quantity: 1,
      },
    ],

    OR

     // line_items: [
        //   {
        //     price: params.priceId,
        //     quantity: 1,
        //   },
        // ],

   */

  if (
    [createParams.client_reference_id, createParams.success_url, createParams.line_items].some(
      item => !item
    )
  ) {
    throw new Error('stripePaymentLink: required params are missing. see lib/stripe.ts');
  }

  if (!createParams.discounts) {
    createParams.allow_promotion_codes = true;
  }

  const paymentLink = await stripe.checkout.sessions.create(
    realMerge(
      {
        mode: 'payment', // subscription or payment
        client_reference_id: createParams.client_reference_id,
        payment_method_types: ['card', 'link'],
        ...(createParams.mode !== 'subscription' && {
          invoice_creation: {
            enabled: true,
          },
        }),
      } as typeof createParams,
      {
        ...createParams,
        success_url:
          createParams.success_url + '?checkout_session_id={CHECKOUT_SESSION_ID}&success=true',
      } as typeof createParams
    ) as typeof createParams
  );

  return paymentLink; // { url: string }
};

export const stripeGetCheckoutSession = async (id: string) => {
  if (!id) {
    throw new Error('stripeGetCheckoutSession: missing parameters. see lib/stripe.ts');
  }

  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ['line_items'],
  });

  /**
   *
   * return and do next moves based on res?.payment_status === 'paid', res?.client_reference_id, res?.customer, etc.
   * give access to product, query to db, etc. (inside nextjs api route where you called this function)
   *
   */

  return session;
};

export default stripe;
