import React from "react";
import { useMissions } from "./useFetchMissions";

const filterParams = {
  year: "2018",
  customerName: "NASA",
};

const FilteredMissionsList = () => {
  const { data: missions, loading } = useMissions(filterParams);

  if (loading) return <div>Loading...</div>;
  if (missions.length === 0) return <div>No data</div>;

  return (
    <div>
      <h2>Filtered Missions</h2>
      <ul>
        {missions.map((mission) => (
          <li key={mission.flight_number}>
            #{mission.flight_number} {mission.mission_name} (
            {mission.payloads_count})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredMissionsList;
