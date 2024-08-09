import "./Styles.css";

function ErrorHandler({ message, show, close }) {
  if (!show) return null;

  return (
    <div className= "hideError">
      <div className= "showError">
        <h2>ERROR</h2>
        <p>{message}</p>
        <button onClick={close} className="btnError">Cerrar</button>
      </div>
    </div>
  );
}

export default ErrorHandler;