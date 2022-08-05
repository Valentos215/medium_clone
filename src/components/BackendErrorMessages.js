const BackendErrorMessages = ({ backendErrors }) => {
  const errorMessages = Object.keys(backendErrors).map((name) => {
    const isArray = Array.isArray(backendErrors[name]);
    if (isArray) return `${name} ${backendErrors[name].join(" ")}`;
    if (name === "message") return backendErrors[name];
    return `${name} ${backendErrors[name]}`;
  });
  return (
    <ul className="error-messages">
      {errorMessages.map((errMessage) => (
        <li key={errMessage}>{errMessage}</li>
      ))}
    </ul>
  );
};

export default BackendErrorMessages;
