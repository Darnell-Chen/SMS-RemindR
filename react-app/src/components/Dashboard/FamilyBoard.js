import AddCard from "./AddCard";
import EmptyCard from "./EmptyCard";
import PersonCard from "./PersonCard";

function FamilyBoard(props) {
    return (
        <>
            <div className="UserCard-Container-Div">

                <div className="row-4 Card-Rows">
                    <div className="col-4 Card-Cols">
                        <AddCard/>
                    </div>
                    <div className="col-4 Card-Cols">
                        <EmptyCard/>
                    </div>
                    <div className="col-4 Card-Cols">
                        <EmptyCard/>
                    </div>
                </div>

                <div className="row-4 Card-Rows">
                    <div className="col-4 Card-Cols">
                        <EmptyCard/>
                    </div>
                    <div className="col-4 Card-Cols">
                        <EmptyCard/>
                    </div>
                    <div className="col-4 Card-Cols">
                        <EmptyCard/>
                    </div>
                </div>

                <div className="row Card-Rows">
                    <div className="col-4 Card-Cols">
                        <EmptyCard/>
                    </div>
                    <div className="col-4 Card-Cols">
                        <EmptyCard/>
                    </div>
                    <div className="col-4 Card-Cols">
                        <EmptyCard/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FamilyBoard;