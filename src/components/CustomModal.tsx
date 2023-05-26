

interface Props {
    title:string;
    setInputState:React.Dispatch<React.SetStateAction<string>>;
    inputState:string;
    setShowAddModal:React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm:()=>void;
}

const CustomModal:React.FC<Props> = ({ title = "Adding Process", setInputState, inputState, setShowAddModal, onConfirm }) => {


    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        setShowAddModal(false);
    };

    return (
        <div className="modal">

            <div className="main-modal">

                <h1 className="title">{title}</h1>

                <div className="new-input">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={inputState} onChange={(e) => setInputState(e.target.value)} />
                        <button onClick={onConfirm} className="btn" type="submit">
                            &#10003;
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CustomModal;