import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

const OrderStatusProgressBar = ({ order_status }: { order_status: string }) => {
  const isPaymentFailed =
    order_status === "Payment Failed" || order_status === "Order Cancelled";

  const getStepStatus = () => {
    if (isPaymentFailed) {
      return [
        {
          label: "Order Failed",
          isCurrentStep: true,
        },
      ];
    }

    const steps = [
      { label: "Order Placed", isCurrentStep: false, step: 1 },
      { label: "Order Confirmed", isCurrentStep: false, step: 2 },
      { label: "Order Shipped", isCurrentStep: false, step: 3 },
      {
        label:
          order_status === "Order Delivering"
            ? "Order Delivering"
            : "Order Delivered",
        isCurrentStep: false,
        step: 4,
      },
    ];

    let currentStepIndex = 0;

    switch (order_status) {
      case "Payment Successful":
      case "Order Processing":
      case "Payment Processing":
        currentStepIndex = 0;
        break;
      case "Order Confirmed":
        currentStepIndex = 1;
        break;
      case "Order Shipped":
        currentStepIndex = 2;
        break;
      case "Order Delivering":
        currentStepIndex = 3;
        break;
      case "Order Delivered":
        currentStepIndex = 3;
        break;
    }

    steps.forEach((step, index) => {
      step.isCurrentStep = index <= currentStepIndex;
    });

    return steps;
  };

  const steps = getStepStatus();

  return (
    <div className="w-full px-4 py-4 md:py-6">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-6 md:w-8 h-6 md:h-8 rounded-full flex items-center justify-center",
                  step.isCurrentStep ? "bg-green" : "bg-separator"
                )}
              >
                {step.isCurrentStep ? (
                  <CheckCircle className="size-4 md:size-6 shrink-0 text-white" />
                ) : (
                  <span className="text-gray-500">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs text-center md:text-medium font-medium",
                  step.isCurrentStep ? "text-green" : "text-separator",
                  step.label === "Order Delivering" &&
                    order_status === "Order Delivering"
                    ? "text-yellow-500"
                    : ""
                )}
              >
                {step.label === "Order Delivering"
                  ? "Out For Delivery"
                  : step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-1 md:-mt-4">
                <Separator
                  className={cn(
                    "h-[2px]",
                    step.isCurrentStep && steps[index + 1].isCurrentStep
                      ? "bg-green"
                      : "bg-separator"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusProgressBar;
