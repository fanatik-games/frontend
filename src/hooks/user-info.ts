import { API_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (session?: Session) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const response = await fetch(API_URL + "/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    },
  });

  return { data, isLoading, error, refetch };
};
