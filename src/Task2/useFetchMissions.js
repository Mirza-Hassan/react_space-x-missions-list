import { useState, useEffect } from "react";
import { prepareData } from "./util";

export const useMissions = (filterParams) => {
  const [missions, setMissions] = useState({ data: [], loading: true });

  useEffect(() => {
    const fetchData = async () => {
      const preparedData = await prepareData(filterParams);
      setMissions({ data: preparedData, loading: false });
    };

    fetchData();
  }, [filterParams]);

  return missions;
};