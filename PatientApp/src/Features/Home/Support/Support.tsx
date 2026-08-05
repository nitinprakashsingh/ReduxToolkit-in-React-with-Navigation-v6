import React from "react"
import {
  ContactGrid,
  ContactItem,
  FaqItem,
  FeedbackForm,
  InfoPanel,
  RecordsPdfLink,
  ScreenBackButton,
  ScreenHeader,
  ScreenSection,
  SupportPage,
} from "../HomeStyle"

const faqs = [
  { question: "How do I book an appointment?", answer: "Search by doctor name or choose a department, select a doctor, then choose a date and slot." },
  { question: "Can I cancel or reschedule?", answer: "Yes. Open Appointments from the side menu and use Cancel or Reschedule on the booking card." },
  { question: "Where can I view reports?", answer: "Open Medical Records to view reports, prescriptions, bills, and discharge summaries." },
  { question: "How do I download payment receipts?", answer: "After a demo payment succeeds, use View receipt or Download receipt on the confirmation screen." },
  { question: "What should I do in an emergency?", answer: "Use the Emergency call option from the home screen or call the support mobile number shown below." },
]

type SupportProps = {
  onBack: () => void
}

const Support = ({ onBack }: SupportProps) => (
  <SupportPage>
    <ScreenHeader>
      <ScreenBackButton type="button" onClick={onBack}>
        Back to home
      </ScreenBackButton>
      <h1>Support</h1>
      <p>Find quick answers, contact details, emergency help, and feedback options.</p>
    </ScreenHeader>

    <ScreenSection>
      <InfoPanel>
        <h2>About us</h2>
        <p>
          Shriyan Healthcare is a demo patient care experience for appointments, payments, medical records, support, and hospital communication in one place.
        </p>
      </InfoPanel>

      <InfoPanel>
        <h2>Contact details</h2>
        <ContactGrid>
          <ContactItem>
            <span>Email</span>
            <a href="mailto:shriyanhelathcare@gmail.com">shriyanhelathcare@gmail.com</a>
          </ContactItem>
          <ContactItem>
            <span>Mobile</span>
            <a href="tel:8540978755">8540978755</a>
          </ContactItem>
          <ContactItem>
            <span>Support hours</span>
            <strong>Monday to Saturday, 9:00 AM - 7:00 PM</strong>
          </ContactItem>
          <ContactItem>
            <span>Address</span>
            <strong>Sector 47, Gurgaon</strong>
          </ContactItem>
        </ContactGrid>
        <ContactGrid>
          <RecordsPdfLink as="a" href="tel:8540978755">Call now</RecordsPdfLink>
          <RecordsPdfLink as="a" href="mailto:shriyanhelathcare@gmail.com">Email support</RecordsPdfLink>
        </ContactGrid>
      </InfoPanel>

      <InfoPanel>
        <h2>Feedback</h2>
        <FeedbackForm>
          <input placeholder="Your name" />
          <input placeholder="Mobile number" />
          <textarea placeholder="Write your issue or feedback" />
          <button type="button">Submit demo request</button>
        </FeedbackForm>
      </InfoPanel>

      <InfoPanel>
        <h2>FAQ</h2>
        {faqs.map((faq) => (
          <FaqItem key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </FaqItem>
        ))}
      </InfoPanel>
    </ScreenSection>
  </SupportPage>
)

export default Support
