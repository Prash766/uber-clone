import { createSlice } from "@reduxjs/toolkit";

export enum ModalType {
  login,
  signup,
  null,
}

export const authModalSlice = createSlice({
  name: "authModalSlice",
  initialState: {
    isOpen: false,
    modalType: ModalType.null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = ModalType.null;
    },
  },
});

export const dropdownMenuModalSlice = createSlice({
  name: "dropdownMenuModalSlice",
  initialState: {
    isMenuModalOpen :false,
  },
  reducers: {
    onClickModal: (state) => {
      state.isMenuModalOpen = !state.isMenuModalOpen;
    },
  },
});

export const { openModal, closeModal } = authModalSlice.actions;
export const { onClickModal } = dropdownMenuModalSlice.actions;

export const authModalReducer = authModalSlice.reducer;
export const dropdownMenuModalReducer = dropdownMenuModalSlice.reducer;
