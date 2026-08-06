import React from "react"
import {
  ContactGrid,
  ContactItem,
  InfoPanel,
  ProfileAvatar,
  ProfileHero,
  ProfilePage,
  ScreenBackButton,
  ScreenHeader,
  ScreenSection,
} from "../HomeStyle"

const Profile = ({ onBack }: { onBack: () => void }) => (
  <ProfilePage>
    <ScreenHeader>
      <ScreenBackButton type="button" onClick={onBack}>
        Back
      </ScreenBackButton>
    </ScreenHeader>

    <ScreenSection>
      <ProfileHero>
        <ProfileAvatar>SS</ProfileAvatar>
        <div>
          <h2>Suraj Singh</h2>
          <p>Patient ID: SHP-0001</p>
        </div>
      </ProfileHero>

      <InfoPanel>
        <h2>Personal details</h2>
        <ContactGrid>
          <ContactItem><span>Age</span><strong>32 years</strong></ContactItem>
          <ContactItem><span>Gender</span><strong>Male</strong></ContactItem>
          <ContactItem><span>Blood group</span><strong>B+</strong></ContactItem>
          <ContactItem><span>Mobile</span><strong>8210173397</strong></ContactItem>
        </ContactGrid>
      </InfoPanel>

      <InfoPanel>
        <h2>Address and emergency contact</h2>
        <ContactGrid>
          <ContactItem><span>Address</span><strong>Bharkuiya Barauli, Gopalganj 841405</strong></ContactItem>
          <ContactItem><span>Emergency contact</span><strong>Ravi Kumar - 9876543210</strong></ContactItem>
        </ContactGrid>
      </InfoPanel>
    </ScreenSection>
  </ProfilePage>
)

export default Profile
