export const OTP_TOKEN_SIZE = 6;
export const API_URL = process.env.NEXT_PUBLIC_API_URL!;
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;
export const MIN_WITHDRAW_AMOUNT = 1000;
export const PLATFORM_FEES = 0.025;
export const APP_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://app.fanatix.games";
