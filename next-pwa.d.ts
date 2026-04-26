/**
 * Typdeklaration för next-pwa (saknar @types/next-pwa).
 */
declare module "next-pwa" {
  import type { NextConfig } from "next";
  function withPWA(config: {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    [key: string]: unknown;
  }): (nextConfig: NextConfig) => NextConfig;
  export default withPWA;
}
