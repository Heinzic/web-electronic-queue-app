import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const ROUTES = {
  SERVICE: "/service",
  OFFICE: "/office",
  DATE: "/date",
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type Routes = typeof ROUTES[RouteKeys];

interface ScenarioState {
  currentScenario: string | null;
  currentStep: number;
  navigationPaths: {
    [key: string]: {
      initialRoute: Routes;
      flow: Routes[];
    };
  };
}

const initialState: ScenarioState = {
  currentScenario: null,
  currentStep: 0,
  navigationPaths: {
    mfc: {
      initialRoute: ROUTES.SERVICE,
      flow: [ROUTES.SERVICE, ROUTES.OFFICE, ROUTES.DATE],
    },
    resource: {
      initialRoute: ROUTES.OFFICE,
      flow: [ROUTES.OFFICE, ROUTES.SERVICE, ROUTES.DATE],
    },
  },
};

const scenarioSlice = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    setScenario: (state, action: PayloadAction<string | null>) => {
      state.currentScenario = action.payload;
      state.currentStep = 0; // Reset step when scenario changes
    },
    nextStep: (state) => {
      if (state.currentScenario) {
        const maxSteps = state.navigationPaths[state.currentScenario].flow.length - 1;
        if (state.currentStep < maxSteps) {
          state.currentStep += 1;
        }
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    resetNavigation: (state) => {
      state.currentStep = 0;
    },
    setStep: (state, action: PayloadAction<number>) => {
      if (state.currentScenario) {
        const maxSteps = state.navigationPaths[state.currentScenario].flow.length - 1;
        state.currentStep = Math.min(Math.max(0, action.payload), maxSteps);
      }
    },
  },
});

// Actions
export const { 
  setScenario, 
  nextStep, 
  previousStep, 
  resetNavigation,
  setStep
} = scenarioSlice.actions;

// Selectors
export const selectCurrentScenario = (state: RootState) => state.scenarioSlice.currentScenario;
export const selectCurrentStep = (state: RootState) => state.scenarioSlice.currentStep;

export const selectCurrentFlow = (state: RootState) => {
  const scenario = state.scenarioSlice.currentScenario;
  return scenario ? state.scenarioSlice.navigationPaths[scenario].flow : null;
};

export const selectNextRoute = (state: RootState) => {
  const flow = selectCurrentFlow(state);
  return flow ? flow[state.scenarioSlice.currentStep + 1] || null : null;
};

export const selectCurrentRoute = (state: RootState) => {
  const flow = selectCurrentFlow(state);
  return flow ? flow[state.scenarioSlice.currentStep] : null;
};

export const selectInitialRoute = (state: RootState) => {
  const scenario = state.scenarioSlice.currentScenario;
  return scenario ? state.scenarioSlice.navigationPaths[scenario].initialRoute : null;
};

export const selectIsLastStep = (state: RootState) => {
  const flow = selectCurrentFlow(state);
  return flow ? state.scenarioSlice.currentStep === flow.length - 1 : false;
};

export const selectNavigationPaths = (state: RootState) => state.scenarioSlice.navigationPaths;

export default scenarioSlice.reducer;
