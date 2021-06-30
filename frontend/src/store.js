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
