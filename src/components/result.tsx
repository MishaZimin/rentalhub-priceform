interface ResultDisplayProps {
    cost: number;
}

const ResultDisplay = ({ cost }: ResultDisplayProps) => {
    return (
        <div className="mx-auto text-center ">
            <p className="text-lg font-bold">Стоимость доставки: {cost} руб.</p>
        </div>
    );
};

export default ResultDisplay;
