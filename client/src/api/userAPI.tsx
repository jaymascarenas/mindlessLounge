import Auth from "../utils/auth";

const retrieveUsers = async () => {
  try {
    const response = await fetch("/api/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid user API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from data retrieval:", err);
    return [];
  }
};

const createPost = async (content: string) => {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create post");
    }

    return data;
  } catch (err) {
    console.error("Error creating post:", err);
    throw err;
  }
};

export { retrieveUsers, createPost };
