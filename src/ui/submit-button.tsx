import { IoSearch } from "react-icons/io5";

interface SubmitButtonProps {
    onSubmit: () => void;
}

const SubmitButton = ({ onSubmit }: SubmitButtonProps) => {
    return (
        <button
            type="submit"
            onClick={onSubmit}
            className="w-10 h-10 p-0 text-black transition duration-200 transform bg-white rounded-lg hover:border-black border-[2px] border-gray-200">
            <IoSearch className="mx-auto" />
        </button>
    );
};

export default SubmitButton;
