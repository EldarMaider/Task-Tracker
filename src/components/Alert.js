function Alert({setShowAlert}) {
  return (
    <div className="alertWrapper">
        <div className="contentAlertWrapper">
          <h3 style={{color: "black"}}>both Task and Day & Time must be filled</h3>
          <button className="btn" onClick={() => setShowAlert(false)}>
            Close
          </button>
        </div>
      </div>
  )
}

export default Alert
