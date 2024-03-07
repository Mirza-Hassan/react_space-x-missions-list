import React, { useState, useEffect } from "react";
import axios from "axios";

const FilteredSpaceXMissions = () => {
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    const year = 2018;
    const keyword = "NASA";

    try {
      const response = await axios.get("https://api.spacexdata.com/v3/launches/past");
      const missions = response.data;

      const filteredAndSortedMissions = missions
        .filter(
          (mission) =>
            mission.launch_year === year.toString() &&
            mission.rocket.second_stage.payloads.some((payload) =>
              payload.customers.some((customer) => customer.includes(keyword))
            )
        )
        .map((mission) => ({
          flight_number: mission.flight_number,
          mission_name: mission.mission_name,
          payloads_count: mission.rocket.second_stage.payloads.length,
          launch_date_utc: mission.launch_date_utc,
        }))
        .sort(
          (a, b) =>
            b.payloads_count - a.payloads_count ||
            new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
        );

      setFilteredMissions(filteredAndSortedMissions);
    } catch (error) {
      console.error("Failed to fetch missions:", error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Filtered Missions</h2>
      <ul>
        {filteredMissions.map((mission) => (
          <li key={mission.flight_number}>
            <b>Flight Number:</b> {mission.flight_number}
            <br />
            <b>Mission Name:</b> {mission.mission_name}
            <br />
            <b>Payloads Count:</b> {mission.payloads_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredSpaceXMissions;
