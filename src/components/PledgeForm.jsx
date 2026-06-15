import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import postPledge from "../api/post-pledge";

function PledgeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    amount: "",
    comment: "",
    is_anonymous: true,
    fundraiser: id,
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
    postPledge(formData)
      .then((response) => {
        navigate(`/fundraiser/${formData.fundraiser}`);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <form>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="text" id="amount" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="is_anonymous">Anonymous:</label>
        <input
          type="checkbox"
          id="is_anonymous"
          defaultChecked={true}
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Create Pledge
      </button>
    </form>
  );
}

export default PledgeForm;
