import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: singup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log("SUCCESS", user);
      toast.success(
        "Account successfully created! Please verify account from the user's email address."
      );
    },
  });

  return { singup, isLoading };
}
