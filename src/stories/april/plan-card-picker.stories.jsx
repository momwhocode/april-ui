import { useState } from "react";
import { PlanCardPicker } from "../../april/components/PlanCardPicker.jsx";
import { StoryFrame } from "../_helpers/StoryFrame.jsx";

const PLANS = [
  { id: "Trial", title: "Trial", badge: "Trial", price: "Free", priceUnit: "/ Month", description: "Start a trial and explore the product." },
  { id: "Base", title: "Base", price: "₹8,500", priceUnit: "/ Month", description: "Core workflows for a growing team." },
  { id: "Pro", title: "Pro", price: "₹18,000", priceUnit: "/ Month", description: "Higher limits and dedicated support." },
];

export default {
  title: "April System/Plan Card Picker",
  tags: ["autodocs"],
  component: PlanCardPicker,
  parameters: { layout: "fullscreen" },
};

export const Playground = {
  render: function PlanPickerStory() {
    const [plan, setPlan] = useState("Pro");
    return (
      <StoryFrame width="min(100%, 720px)">
        <PlanCardPicker plans={PLANS} value={plan} onChange={setPlan} />
      </StoryFrame>
    );
  },
};
