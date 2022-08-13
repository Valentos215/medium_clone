import React from "react";

type Error = { name: { errors: string[] } } | { name: { error: string } };
type BackendErrorProps = { backendErrors: Error | null };

const BackendErrorMessages: React.FC<BackendErrorProps> = (backendErrors) => {
  if (backendErrors) {
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
  } else
    return (
      <ul className="error-messages">
        <li>Some backend error happened</li>
      </ul>
    );
};

export default BackendErrorMessages;
