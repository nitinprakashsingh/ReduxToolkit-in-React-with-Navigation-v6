import React, { useMemo, useState } from "react"
import {
  DemoBadge,
  InfoPanel,
  RecordsGrid,
  RecordsPdfLink,
  RecordsPage,
  RecordsSummary,
  RecordsTabs,
  ScreenBackButton,
  ScreenHeader,
  ScreenSection,
  UploadPanel,
} from "../HomeStyle"

const medicalRecords = [
  {
    title: "Blood Test Report",
    date: "12 Aug 2026",
    type: "Reports",
    summary: "CBC, lipid profile, and blood sugar values are available for review.",
    status: "Ready",
    fileUrl: "/reports/demo-medical-report.pdf",
  },
  {
    title: "Doctor Prescription",
    date: "08 Aug 2026",
    type: "Prescriptions",
    summary: "Medication plan and follow-up advice from your recent consultation.",
    status: "Ready",
    fileUrl: "/reports/demo-medical-report.pdf",
  },
  {
    title: "Discharge Summary",
    date: "22 Jul 2026",
    type: "Discharge Summary",
    summary: "Visit notes, diagnosis details, and care instructions after discharge.",
    status: "Draft",
    fileUrl: "/reports/demo-medical-report.pdf",
  },
  {
    title: "Consultation Bill",
    date: "18 Jul 2026",
    type: "Bills",
    summary: "Demo invoice and payment details for a completed consultation.",
    status: "Demo",
    fileUrl: "/reports/demo-medical-report.pdf",
  },
]

const tabs = ["All", "Reports", "Prescriptions", "Discharge Summary", "Bills"]

type MedicalRecordsProps = {
  onBack: () => void
}

const MedicalRecords = ({ onBack }: MedicalRecordsProps) => {
  const [activeTab, setActiveTab] = useState("All")
  const visibleRecords = useMemo(
    () => medicalRecords.filter((record) => activeTab === "All" || record.type === activeTab),
    [activeTab]
  )

  return (
    <RecordsPage>
      <ScreenHeader>
        <ScreenBackButton type="button" onClick={onBack}>
          Back to home
        </ScreenBackButton>
        <h1>Medical records</h1>
        <p>Reports, prescriptions, discharge summaries, bills, and future uploaded patient documents.</p>
      </ScreenHeader>

      <ScreenSection>
        <InfoPanel>
          <DemoBadge>Demo idea</DemoBadge>
          <h2>How reports can appear here</h2>
          <p>Patients can preview PDFs, download reports, filter by document type, and upload outside reports for hospital review.</p>
        </InfoPanel>

        <RecordsTabs>
          {tabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} data-active={activeTab === tab}>
              {tab}
            </button>
          ))}
        </RecordsTabs>

        <UploadPanel>
          <div>
            <h2>Upload report</h2>
            <p>Demo placeholder for uploading PDFs, images, or lab reports from another hospital.</p>
          </div>
          <button type="button">Choose file</button>
        </UploadPanel>

        <RecordsGrid>
          {visibleRecords.map((record) => (
            <RecordsSummary key={record.title}>
              <span>{record.type}</span>
              <h3>{record.title}</h3>
              <p>{record.summary}</p>
              <strong>{record.date}</strong>
              <DemoBadge>{record.status}</DemoBadge>
              <RecordsPdfLink href={record.fileUrl} target="_blank" rel="noreferrer">
                View PDF
              </RecordsPdfLink>
              <RecordsPdfLink href={record.fileUrl} download>
                Download
              </RecordsPdfLink>
            </RecordsSummary>
          ))}
        </RecordsGrid>
      </ScreenSection>
    </RecordsPage>
  )
}

export default MedicalRecords
