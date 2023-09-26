import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  // since its custom hook, we can use other hooks inside it
  const [searchParams] = useSearchParams();

  //FILTER
  // all because we want to show `all` bookings by default
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // added filter object, whenever the filter changes, the query will be refetched
    queryKey: ["bookings", filter],
    // create new function which is the arrow function so we can pass in that object of options
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, error, bookings };
}
