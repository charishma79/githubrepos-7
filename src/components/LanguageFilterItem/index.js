// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, setActiveButton, isActive} = props
  const {language, id} = languageDetails
  const activeBtn = isActive ? 'active-btn' : 'btn'

  const onClickIcon = () => {
    setActiveButton(id)
  }

  return (
    <li className="list-item">
      <button className={activeBtn} type="button" onClick={onClickIcon}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
