const BackendErrorMessages = ({ backendErrors }) => {
  const errorMessages = Object.keys(backendErrors).map((name) => {
    const messages = backendErrors[name].join(" ");
    return `${name} ${messages}`;
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
