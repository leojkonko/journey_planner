import { api } from "./api";

export type ActivitiesDetails = {
  id: string;
};

async function getActivities(id: string) {
  try {
    const { data } = await api.get(`/trips/${id}/activities`);
    return data.activities;
  } catch (error) {
    throw error;
  }
}
async function createActivities(id: string, title: string, accurs_at: string) {
  try {
    const { data } = await api.post(`/trips/${id}/activities`, {
      title,
      accurs_at,
    });
    return data.activityId;
  } catch (error) {
    throw error;
  }
}

export const activitiesServer = { getActivities, createActivities };
