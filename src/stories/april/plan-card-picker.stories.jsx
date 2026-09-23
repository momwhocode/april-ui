import { useState } from "react";
import { PlanCardPicker } from "../../april/components/PlanCardPicker.jsx";
import { StoryFrame } from "../_helpers/StoryFrame.jsx";

const PLANS = [
  { id: "Trial", title: "Trial", badge: "Trial", price: "Free", priceUnit: "/ month", description: "Try the product before you choose a plan." },
  { id: "Base", title: "Base", price: "$12", priceUnit: "/ month", description: "The essentials for a small team." },
  { id: "Pro", title: "Pro", price: "$29", priceUnit: "/ month", description: "Higher limits and priority support." },
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
