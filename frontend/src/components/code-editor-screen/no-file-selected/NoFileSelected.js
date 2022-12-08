import "./NoFileSelected.css";

const NoFileSelected = ({ message = "No file selected!" }) => {
  return (
    <div className="container-div">
      <p>{message}</p>
    </div>
  );
};

export default NoFileSelected;
