import { useRef, useEffect, useCallback } from "react";
import {
	Modal,
	ModalContent,
	ModalImg,
	ModalImgContainer,
	Close,
} from "../../styles/StyledModal";
import logo from "../../images/BarkerLogo.png";
import { X } from "@styled-icons/feather";

import FilterDog from "../form/FilterDog";

const FilterModal = ({ filter, setFilter, openModal, setOpenModal }) => {
	const handleClickOutside = useCallback(
		(event) => {
			if (
				ref.current &&
				!ref.current.contains(event.target) &&
				!event.target.classList[0]?.includes("Mui")
			) {
				setOpenModal(false);
			}
		},
		[setOpenModal]
	);

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handleClickOutside]);
	return (
		<Modal modal={openModal}>
			<ModalContent ref={ref}>
				<ModalImgContainer>
					<Close onClick={() => setOpenModal(false)}>
						<X size="32" title="Close" />
					</Close>
					<ModalImg src={logo} alt="logo" />
				</ModalImgContainer>

				<FilterDog
					filter={filter}
					setFilter={setFilter}
					setOpenModal={setOpenModal}
				/>
			</ModalContent>
		</Modal>
	);
};

export default FilterModal;
