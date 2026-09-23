import { Tag } from "./Tag.jsx";

function planInputId(name, planId) {
  return `${name}-${String(planId ?? "").replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function PlanCardDefault({ plan, selected, readOnly, inputId, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      id={inputId}
      aria-checked={selected}
      disabled={readOnly}
      className={[
        "april-modal__plan-card",
        selected ? "april-modal__plan-card--selected" : "",
        readOnly ? "april-modal__plan-card--readonly" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => {
        if (!readOnly) onSelect(plan.id);
      }}
    >
      <span className="april-modal__plan-card-leading" aria-hidden="true">
        <span className="april-plan-picker__radio" data-selected={selected} />
      </span>
      <span className="april-modal__plan-card-main">
        <span className="april-modal__plan-card-title-row">
          <span className="april-modal__plan-card-title april-text-style april-text-style--text-md-semibold">
            {plan.title}
          </span>
          {plan.subtitle ? (
            <span className="april-modal__plan-card-subtitle april-text-style april-text-style--text-xs-regular">
              {plan.subtitle}
            </span>
          ) : null}
          {plan.badge ? (
            <span className="april-modal__plan-card-badges">
              <Tag type="info" label={plan.badge} leadingIcon={false} trailingIcon={false} />
            </span>
          ) : null}
        </span>
        <span className="april-modal__plan-card-description april-text-style april-text-style--text-sm-regular">
          {plan.description}
        </span>
      </span>
      <span className="april-modal__plan-card-price">
        <span className="april-modal__plan-card-price-value april-text-style april-text-style--text-md-semibold">
          {plan.price}
        </span>
        <span className="april-modal__plan-card-price-unit april-text-style april-text-style--text-sm-regular">
          {plan.priceUnit}
        </span>
      </span>
    </button>
  );
}

function PlanCardCompact({ plan, selected, readOnly, inputId, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      id={inputId}
      aria-checked={selected}
      disabled={readOnly}
      className={[
        "april-modal__plan-card",
        "april-modal__plan-card--compact",
        selected ? "april-modal__plan-card--selected" : "",
        readOnly ? "april-modal__plan-card--readonly" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => {
        if (!readOnly) onSelect(plan.id);
      }}
    >
      <span className="april-modal__plan-card-leading" aria-hidden="true">
        <span
          className="april-plan-picker__radio april-plan-picker__radio--lg"
          data-selected={selected}
        />
      </span>
      <span className="april-modal__plan-card-compact-body">
        <span className="april-modal__plan-card-compact-header">
          <span className="april-modal__plan-card-compact-title-group">
            <span className="april-modal__plan-card-title april-text-style april-text-style--text-xs-semibold">
              {plan.title}
            </span>
            {plan.badge ? (
              <Tag type="info" label={plan.badge} leadingIcon={false} trailingIcon={false} />
            ) : null}
          </span>
          <span className="april-modal__plan-card-compact-price">
            <span className="april-modal__plan-card-price-value april-text-style april-text-style--text-md-semibold">
              {plan.price}
            </span>
            <span className="april-modal__plan-card-price-unit april-text-style april-text-style--text-xxs-regular">
              {plan.priceUnit}
            </span>
          </span>
        </span>
        <span className="april-modal__plan-card-description april-text-style april-text-style--text-xxs-regular">
          {plan.description}
        </span>
      </span>
    </button>
  );
}

/** Plan selection cards — Figma 3213:45369 (compact) / 769:14958 (default) */
export function PlanCardPicker({
  plans,
  value,
  onChange,
  name = "plan",
  readOnly = false,
  variant = "default",
}) {
  const isCompact = variant === "compact";
  const Card = isCompact ? PlanCardCompact : PlanCardDefault;

  return (
    <div
      className={["april-plan-picker", isCompact ? "april-plan-picker--compact" : ""]
        .filter(Boolean)
        .join(" ")}
      role="radiogroup"
      aria-label="Select a plan"
    >
      {plans.map((plan) => {
        const selected = value === plan.id;
        const inputId = planInputId(name, plan.id);

        return (
          <Card
            key={plan.id}
            plan={plan}
            selected={selected}
            readOnly={readOnly}
            inputId={inputId}
            onSelect={onChange}
          />
        );
      })}
    </div>
  );
}
