import DailyWeather from "./DailyWeather";
import HourlyWeather from "./HourlyWeather";

interface DetailCity {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: HourlyWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export default DetailCity;
