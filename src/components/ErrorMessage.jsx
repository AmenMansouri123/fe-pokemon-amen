
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message-card" role="alert">
      <div className="error-icon">⚠️</div>

      <h2>Oops! Something went wrong</h2>

      <p>{message}</p>

      {onRetry && (
        <button type="button" onClick={onRetry}>
          🔄 Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
