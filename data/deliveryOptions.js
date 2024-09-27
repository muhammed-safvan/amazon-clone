import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const addWeekend = checkDeliveryDate(today, deliveryOption);
  const deliveryDate = today.add(`${deliveryOption.deliveryDays + addWeekend}`, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}

function checkDeliveryDate(today, deliveryOption) {
  const deliveryDays = deliveryOption.deliveryDays;
  let addWeekend = 0;
  for (let i = 0; i < deliveryDays; i++) {
    today = today.add(1,'day');
    if (isWeekend(today)) {
      addWeekend++;
      if(isWeekend(today) === 'Saturday'){
        addWeekend++;
      }
    }

  }
  return addWeekend;
}
function isWeekend(date) {
  const dateString = date.format("dddd");

  if (dateString === "Saturday" || dateString === "Sunday") {
    return dateString;
  }
  return false;
}
