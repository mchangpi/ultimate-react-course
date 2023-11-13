import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault(); /* prevent submitting the form */
          navigate(-1);
        }}
      >
        ← Back
      </Button>
    </div>
  );
}

export default BackButton;
