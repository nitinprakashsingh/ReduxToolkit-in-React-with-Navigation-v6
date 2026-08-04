import React, { useEffect, useState } from "react"
import { getPaymentMethod, paymentHistoryKey } from "./paymentData"
import {
  PaymentBackButton,
  PaymentEmptyState,
  PaymentMethodIcon,
  PaymentMethodRow,
  PaymentMethodsPage,
  PaymentPanel,
  PaymentTopbar,
} from "../HomeStyle"

type PaymentMethodsProps = { onBack: () => void }

const PaymentMethods = ({ onBack }: PaymentMethodsProps) => {
  const [usedMethods, setUsedMethods] = useState<string[]>([])

  useEffect(() => {
    try {
      setUsedMethods(JSON.parse(window.localStorage.getItem(paymentHistoryKey) || "[]"))
    } catch {
      setUsedMethods([])
    }
  }, [])

  return (
    <PaymentMethodsPage>
      <PaymentTopbar>
        <PaymentBackButton type="button" onClick={onBack}>← Back to home</PaymentBackButton>
        <h1>Payment methods</h1>
        <p>Methods you have used for appointment payments.</p>
      </PaymentTopbar>
      <PaymentPanel>
        {usedMethods.length ? usedMethods.map((methodId) => {
          const method = getPaymentMethod(methodId)
          return <PaymentMethodRow key={method.id} as="div" $selected><PaymentMethodIcon $accent={method.accent}>{method.icon}</PaymentMethodIcon><span><strong>{method.name}</strong><small>{method.detail} · Used for an appointment</small></span><b>✓</b></PaymentMethodRow>
        }) : <PaymentEmptyState><span>₹</span><h2>No payment methods used yet</h2><p>Once you complete a demo appointment payment, the method will appear here.</p></PaymentEmptyState>}
      </PaymentPanel>
    </PaymentMethodsPage>
  )
}

export default PaymentMethods
