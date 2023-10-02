import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    // we want to make sure that the query is not refetched
    // react-query will automatically refetch the query when the component mounts
    // but we don't want that because we want to make sure that we have the bookingId
    // that is why we set the retry to false
    retry: false,
  });

  return { isLoading, error, booking };
}
