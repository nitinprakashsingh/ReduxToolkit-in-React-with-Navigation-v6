export type PaymentMethod = {
  id: string
  name: string
  detail: string
  icon: string
  accent: string
}

export const paymentMethods: PaymentMethod[] = [
  { id: "phonepe", name: "PhonePe", detail: "UPI", icon: "पे", accent: "#5f259f" },
  { id: "gpay", name: "Google Pay", detail: "UPI", icon: "G", accent: "#4285f4" },
  { id: "paytm", name: "Paytm", detail: "UPI", icon: "paytm", accent: "#00baf2" },
  { id: "card", name: "Credit or debit card", detail: "Visa, Mastercard & RuPay", icon: "▣", accent: "#1d4ed8" },
]

export const getPaymentMethod = (id: string) => paymentMethods.find((method) => method.id === id) ?? paymentMethods[0]

export const paymentHistoryKey = "patient-app-payment-methods"
