import './index.css'

const Filter = props => {
  const {employmentTypesList, salaryRangesList} = props

  const renderSalary = () => (
    <ul className="ul-cont-filter">
      {salaryRangesList.map(each => {
        const {changeSalaryId} = props
        const changeSalary = () => changeSalaryId(each.salaryRangeId)

        return (
          <li
            key={each.salaryRangeId}
            onClick={changeSalary}
            className="list-cont"
          >
            <input
              type="radio"
              id={each.salaryRangeId}
              name="package"
              className="input-filter"
            />
            <label htmlFor={each.salaryRangeId} className="label-filter">
              {each.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  const renderEmployment = () => (
    <ul className="ul-cont-filter">
      {employmentTypesList.map(each => {
        const {changeEmploymentId} = props
        const changeId = () => changeEmploymentId(each.employmentTypeId)

        return (
          <li
            key={each.employmentTypeId}
            onClick={changeId}
            className="list-cont"
          >
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.label}
              className="input-filter"
            />
            <label htmlFor={each.employmentTypeId} className="label-filter">
              {each.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="filter-cont">
      <h1 className="filter-headers">Type of Employment</h1>
      {renderEmployment()}
      <hr />
      <h1 className="filter-headers">Salary Range</h1>
      {renderSalary()}
    </div>
  )
}

export default Filter
