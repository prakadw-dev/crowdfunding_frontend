async function postFundraiser(fundraiserData) {
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;
  const token = window.localStorage.getItem("token");

  const formData = new FormData();
  formData.append("title", fundraiserData.title);
  formData.append("description", fundraiserData.description);
  formData.append("target_amount", fundraiserData.target_amount);
  formData.append("is_open", fundraiserData.is_open);
  if (fundraiserData.image) {
    formData.append("image", fundraiserData.image);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const fallbackError = "Error creating fundraiser";
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postFundraiser;
