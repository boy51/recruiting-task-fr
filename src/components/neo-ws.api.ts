import axios, { AxiosPromise } from "axios";
import { NeoWsFeedResponse } from "./neo-ws.typings";

axios.defaults.baseURL = "https://api.nasa.gov/neo/rest/v1";
axios.defaults.params = {
  api_key: "DEMO_KEY",
};

interface GetFeedParams {
  start_date?: string;
  end_date?: string;
  detailed?: boolean;
}

export function getFeed(params: GetFeedParams = {}): AxiosPromise<NeoWsFeedResponse> {
  return axios.get<NeoWsFeedResponse>("feed", { params });
}
