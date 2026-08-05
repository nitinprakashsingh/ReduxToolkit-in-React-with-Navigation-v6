import React, { useState } from "react"
import type { Doctor } from "../DoctorResults/doctorData"
import { getPaymentMethod, paymentMethods } from "./paymentData"
import {
  PaymentAmount,
  PaymentBackButton,
  PaymentChangeButton,
  PaymentConfirmation,
  PaymentConfirmationIcon,
  PaymentDemoNote,
  PaymentMethodIcon,
  PaymentMethodRow,
  PaymentPage,
  PaymentPanel,
  PaymentPayButton,
  PaymentReceiptActions,
  PaymentSectionTitle,
  PaymentTopbar,
} from "../HomeStyle"

type PaymentScreenProps = {
  doctor: Doctor
  date: string
  slot: string
  onBack: () => void
  onComplete: (methodId: string) => void
  onDone: () => void
}

const PaymentScreen = ({ doctor, date, slot, onBack, onComplete, onDone }: PaymentScreenProps) => {
  const [selectedMethodId, setSelectedMethodId] = useState("phonepe")
  const [changingMethod, setChangingMethod] = useState(false)
  const [paid, setPaid] = useState(false)
  const selectedMethod = getPaymentMethod(selectedMethodId)

  const makePayment = () => {
    setPaid(true)
    onComplete(selectedMethodId)
    window.setTimeout(onDone, 900)
  }

  if (paid) {
    return (
      <PaymentPage>
        <PaymentTopbar><PaymentBackButton type="button" onClick={onBack}>← Back to booking</PaymentBackButton></PaymentTopbar>
        <PaymentConfirmation>
          <PaymentConfirmationIcon>✓</PaymentConfirmationIcon>
          <p>Payment successful</p>
          <h1>Appointment booked</h1>
          <span>Your consultation with {doctor.name} is confirmed for {date} at {slot}.</span>
          <PaymentReceiptActions>
            <a href="/reports/demo-payment-receipt.pdf" target="_blank" rel="noreferrer">View receipt</a>
            <a href="/reports/demo-payment-receipt.pdf" download>Download receipt</a>
          </PaymentReceiptActions>
          <PaymentPayButton type="button" onClick={onDone}>Done</PaymentPayButton>
        </PaymentConfirmation>
      </PaymentPage>
    )
  }

  return (
    <PaymentPage>
      <PaymentTopbar>
        <PaymentBackButton type="button" onClick={onBack}>← Back to booking</PaymentBackButton>
        <h1>Make payment</h1>
      </PaymentTopbar>
      <PaymentPanel>
        <p>Consultation with {doctor.name}</p>
        <h2>{doctor.specialty}</h2>
        <PaymentAmount><span>Amount to pay</span><strong>{doctor.fee}</strong></PaymentAmount>
        <PaymentDemoNote>Demo payment — no money will be charged.</PaymentDemoNote>

        <PaymentSectionTitle>
          <span>Pay using</span>
          <PaymentChangeButton type="button" onClick={() => setChangingMethod(!changingMethod)}>
            {changingMethod ? "Close" : "Change"}
          </PaymentChangeButton>
        </PaymentSectionTitle>

        {!changingMethod ? (
          <PaymentMethodRow type="button" $selected onClick={() => setChangingMethod(true)}>
            <PaymentMethodIcon $accent={selectedMethod.accent}>{selectedMethod.icon}</PaymentMethodIcon>
            <span><strong>{selectedMethod.name}</strong><small>{selectedMethod.detail}</small></span>
            <b>›</b>
          </PaymentMethodRow>
        ) : (
          <div>
            {paymentMethods.map((method) => (
              <PaymentMethodRow
                key={method.id}
                type="button"
                $selected={selectedMethodId === method.id}
                onClick={() => { setSelectedMethodId(method.id); setChangingMethod(false) }}
              >
                <PaymentMethodIcon $accent={method.accent}>{method.icon}</PaymentMethodIcon>
                <span><strong>{method.name}</strong><small>{method.detail}</small></span>
                <b>{selectedMethodId === method.id ? "✓" : ""}</b>
              </PaymentMethodRow>
            ))}
          </div>
        )}

        <PaymentPayButton type="button" onClick={makePayment}>Pay {doctor.fee} securely</PaymentPayButton>
      </PaymentPanel>
    </PaymentPage>
  )
}

export default PaymentScreen
