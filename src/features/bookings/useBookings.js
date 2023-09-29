import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  // since its custom hook, we can use other hooks inside it
  const [searchParams] = useSearchParams();

  //
  //
  //FILTER
  //
  // all because we want to show `all` bookings by default
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };
  //
  //
  // SORT
  //
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  // destructure the value and split it, to get the (startDate and desc)
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //
  //
  // PAGINATION
  //
  const page = !searchParams.get("page")
    ? 1
    : // made sure to convert the string to a number
      Number(searchParams.get("page"));

  //
  //
  // QUERY
  //
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // added filter object, whenever the filter changes, the query will be refetched
    queryKey: ["bookings", filter, sortBy, page],
    // create new function which is the arrow function so we can pass in that object of options
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //
  //
  // PRE-FETCHING
  //
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      // plus 1 because we want to prefetch the next page
      // because it is an object, page: page + 1
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      // plus 1 because we want to prefetch the next page
      // because it is an object, page: page + 1
    });

  return { isLoading, error, bookings, count };
}
