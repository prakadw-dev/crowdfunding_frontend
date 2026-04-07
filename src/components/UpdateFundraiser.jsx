import { useState } from "react";
import { useNavigate } from "react-router-dom";
import updateFundraiser from "../api/update-fundraiser";

function UpdateFundraiserForm({
  fundraiserId,
  currentTargetAmount,
  currentIsOpen,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    target_amount: currentTargetAmount,
    is_open: currentIsOpen,
  });

  const handleChange = (event) => {
    const { id, value, type, checked, files } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateFundraiser(formData, fundraiserId)
      .then((response) => {
        navigate(`/fundraiser/${fundraiserId}`);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <form>
      <div>
        <label htmlFor="target_amount">Target Amount:</label>
        <input type="number" id="target_amount" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="is_open">Open to supporters:</label>
        <input
          type="checkbox"
          id="is_open"
          defaultChecked={true}
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Update Fundraiser
      </button>
    </form>
  );
}

export default UpdateFundraiserForm;
