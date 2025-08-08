import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";
import { getToken } from "../lib/authenticate";

const PUBLIC_PATHS = ["/", "/login", "/register"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    try {
      setFavourites(await getFavourites());
      setSearchHistory(await getHistory());
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  }

  useEffect(() => {
    const authCheck = async () => {
      const token = getToken();
      const path = router.pathname;

      if (!token && !PUBLIC_PATHS.includes(path)) {
        router.push("/login");
      } else if (token) {
        await updateAtoms(); // Repopulate atoms after refresh or login
      }
    };

    authCheck();

    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router]);

  return children;
}
