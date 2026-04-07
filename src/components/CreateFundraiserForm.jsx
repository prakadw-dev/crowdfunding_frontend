import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser";

function CreateFundraiserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_amount: "",
    is_open: true,
    image: null,
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
    postFundraiser(formData)
      .then((response) => {
        navigate(`/fundraiser/${response.id}`);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" onChange={handleChange} />
      </div>
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
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Create Fundraiser
      </button>
    </form>
  );
}

export default CreateFundraiserForm;
