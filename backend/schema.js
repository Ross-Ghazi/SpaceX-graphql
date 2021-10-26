import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
} from "graphql";
import axios from "axios";

console.log("+++++");
//Lunch type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

//Rocket type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        console.log("+++++");
        const response = await axios.get(
          "https://api.spacexdata.com/v3/launches"
        );

        // or const {data}=await axios.get(url)
        return response.data;
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        console.log("+++++");

        const { data } = await axios.get(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        );

        return data;
      },
    },
  },
});

//no mutation

export default new GraphQLSchema({
  query: RootQuery,
});
