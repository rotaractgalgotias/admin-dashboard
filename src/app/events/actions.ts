"use server";

import axios from "axios";

export const publishAction = async () => {
  const URL = `${process.env.DEPLOY_HOOK}?buildCache=false`;

  try {
    await axios.post(URL);
    return { success: true, message: "Published successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to publish" };
  }
};
