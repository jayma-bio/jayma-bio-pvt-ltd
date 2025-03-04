/**
 * An array of routes that are publicly accessible.
 * These routes do not require authentication.
 *
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/about",
  "/products",
  "/blogs",
  "/contact",
  "/events",
  "/career",
  "/categories",
  "/terms-conditions",
  "/cancellation-refund",
  "/privacy-policy",
  "/api/products/add",
  "/api/products/getById",
  "/api/products/getAll",
  "/api/products/update",
  "/api/products/delete",
  "/api/uploadthing",
  "/api/newsletter/add",
  "/api/events/add",
  "/api/events/getById",
  "/api/events/getAll",
  "/api/events/update",
  "/api/events/delete",
  "/api/webhook",
  "/api/:id/checkout",
  "/api/:id/status",
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect loged in users to the /settings route.
 *
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for our auth API Route
 * Routes with this prefix are used for API Authentication Purposes.
 *
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
