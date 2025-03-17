import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyState {
  value: number;
  companyName: string;
}

const initialState: CompanyState = {
  value: 0,
  companyName: "",
};

const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, setCompanyName } =
  CompanySlice.actions;
export default CompanySlice.reducer;
