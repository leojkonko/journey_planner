import { api } from "./api";

export type ActivitiesDetails = {
  id: string;
};

async function getActivities(id: string) {
  try {
    const { data } = await api.get(`/trips/${id}/activities`);
    console.log(data);
    return data.activities;
  } catch (error) {
    throw error;
  }
}

export const activitiesServer = { getActivities };
