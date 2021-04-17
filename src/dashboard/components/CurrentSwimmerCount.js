import {connect} from "react-redux";

function CurrentSwimmerCount(props) {
    return (
        <p>Current swimmers: {props.currentSwimmersCount}</p>
    );
}

const mapStateToProps = state => ({
    statistics: state.statistics,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSwimmerCount);