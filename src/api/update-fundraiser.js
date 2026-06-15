async function updateFundraiser(fundraiserData, fundraiserId) {
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}`;
  const token = window.localStorage.getItem("token");

  const body = JSON.stringify({
    target_amount: fundraiserData.target_amount,
    is_open: fundraiserData.is_open,
  });

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    const fallbackError = "Error updating fundraiser";
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default updateFundraiser;
