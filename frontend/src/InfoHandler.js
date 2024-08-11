import "./Styles.css";

function InfoHandler({ message, show, close, type }) {
  if (!show) return null;

  //Shows a box with  information
  return (
    <div className= "hide">
      <div className= "show">
        <h2>{type}</h2>
        <p>{message}</p>
        <button onClick={close} className="btnHandler">Cerrar</button>
      </div>
    </div>
  );
}

export default InfoHandler;