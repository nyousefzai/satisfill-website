"use client";

import AppetiteFulfillment from "./appetite-fulfillment";
import EasiestDietToFollow from "./easiest-diet-to-follow";
import Home from "./home";
import MembershipPlansAndPricing from "./membership-plans-and-pricing";
import NutritionAndHealth from "./nutrition-and-health";

export default function HomePage() {
  return (
    <>
      <Home />

      <AppetiteFulfillment />

      <EasiestDietToFollow />

      <NutritionAndHealth />

      <MembershipPlansAndPricing />
    </>
  );
}
