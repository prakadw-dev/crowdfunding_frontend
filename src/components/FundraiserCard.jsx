import { Link, useActionData } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;
  const fundraiserLink = `fundraiser/${fundraiserData.id}`;

  return (
    <div className="fundraiser-card">
      <Link to={fundraiserLink}>
        <img src={fundraiserData.image} alt={fundraiserData.title} />
        <h3>{fundraiserData.title}</h3>
      </Link>
      <button type="submit" onChange={useActionData}>
        Pledge
      </button>
    </div>
  );
}

export default FundraiserCard;
