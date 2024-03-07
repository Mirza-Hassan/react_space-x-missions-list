import axios from 'axios';

export const prepareData = async ({ year, customerName }) => {
  try {
    const response = await axios.get("https://api.spacexdata.com/v3/launches/past");
    const missions = response.data;

    const filteredAndSortedMissions = missions
      .filter((mission) =>
        mission.launch_year === year &&
        mission.rocket.second_stage.payloads.some((payload) =>
          payload.customers.some((customer) => customer.includes(customerName))
        )
      )
      .map((mission) => ({
        flight_number: mission.flight_number,
        mission_name: mission.mission_name,
        payloads_count: mission.rocket.second_stage.payloads.length,
        launch_date_utc: mission.launch_date_utc,
      }))
      .sort((a, b) =>
        b.payloads_count - a.payloads_count ||
        new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
      );

    return filteredAndSortedMissions;
  } catch (error) {
    return [];
  }
};
