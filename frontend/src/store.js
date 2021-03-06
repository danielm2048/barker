import create from "zustand";

export const useChoiceStore = create((set) => ({
	isClicked: false,
	direction: "",
	setIsClicked: (isClicked, direction) => set({ isClicked, direction }),
}));

export const useTokenStore = create((set) => ({
	accessToken: "",
	setAccessToken: (accessToken) => set({ accessToken }),
}));

export const useModalStore = create((set) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
}));

export const useToastStore = create((set) => ({
	open: false,
	type: "",
	message: "",
	setToast: (type, message) => set({ open: true, type, message }),
	clearToast: () => set({ open: false, message: "" }),
}));

export const useDrawerStore = create((set) => ({
	open: false,
	dog: null,
	isDogMine: false,
	setOpen: (value) => set({ open: value }),
	setDogAndOpen: (dog, isDogMine) => set({ open: true, dog, isDogMine }),
}));
