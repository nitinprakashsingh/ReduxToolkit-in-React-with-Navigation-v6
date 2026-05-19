import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <label htmlFor="language-select" style={{ color: '#374151', fontSize: 13, fontWeight: 700 }}>
        {t('language.label')}:
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={handleChange}
        style={{
          borderRadius: 8,
          border: '1px solid #d1d5db',
          background: '#ffffff',
          padding: '6px 10px',
          fontSize: 14,
          color: '#111827',
        }}
      >
        <option value="en">{t('language.en')}</option>
        <option value="de">{t('language.de')}</option>
        <option value="ja">{t('language.ja')}</option>
      </select>
    </div>
  )
}

export default LanguageSwitcher
