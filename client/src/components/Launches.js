import React from "react";
import { useQuery, gql } from "@apollo/client";
import LaunchItems from "./LaunchItems";
import Missionkey from "./Missionkey";

const LAUNCHES_Query = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES_Query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... </p>;
  console.log(data);

  return (
    <>
      <h1 className="display-4 my-3">Launches</h1>
      {/* display-xx is  "Display headings" and changes the size of this heading*/}
      <Missionkey />
      {data.launches.map((launch) => (
        <LaunchItems key={launch.flight_number} launch={launch} />
      ))}
    </>
  );
}

export default Launches;
