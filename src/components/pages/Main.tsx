import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Cards from "../shared/Cards";
import {
  ROUTES,
  setScenario,
  selectCurrentScenario,
  selectCurrentRoute,
  selectNavigationPaths,
} from "../../store/slices/scenarioSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const cardData = [
  { title: "Дата и время", link: ROUTES.DATE },
  { title: "Место", link: ROUTES.OFFICE },
  { title: "Услуга", link: ROUTES.SERVICE },
];

function Main() {
  const { scenario } = useParams<{ scenario?: string }>();
  const dispatch = useAppDispatch();
  const currentScenario = useAppSelector(selectCurrentScenario);
  const currentRoute = useAppSelector(selectCurrentRoute);
  const navigationPaths = useAppSelector(selectNavigationPaths);

  useEffect(() => {
    // Only set scenario if it exists in our navigation paths
    if (scenario !== currentScenario) {
      if (!scenario || scenario in navigationPaths) {
        dispatch(setScenario(scenario || null));
      } else {
        // If scenario is invalid, reset to null
        dispatch(setScenario(null));
      }
    }
  }, [scenario, currentScenario, dispatch, navigationPaths]);

  // Show default main page if:
  // 1. No scenario parameter (undefined)
  // 2. Invalid scenario (not in navigationPaths)
  // 3. Scenario is null (explicitly reset)
  if (!scenario || !(scenario in navigationPaths)) {
    return (
      <>
        <Cards cards={cardData} />
      </>
    );
  }

  // Valid scenario and we have a route - navigate to it
  if (currentRoute) {
    console.log(`Redirecting to ${currentRoute}`);
    return <Navigate to={currentRoute} />;
  }

  // Fallback to home page if something unexpected happens
  return <Navigate to="/" />;
}

export default Main;