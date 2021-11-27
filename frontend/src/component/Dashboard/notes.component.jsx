import React from "react";
import { Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { backendURL } from "../../utils/backURL";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: "",
      resources: [],
    };
  }
  onLoad() {
    const { myTutor } = this.props.tutor;
    axios
      .post(`${backendURL}/test/users/viewResources`, {
        teacherId: myTutor.myTutor,
        token: `${localStorage.getItem("jwtToken").split(" ")[1]}`,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          resources: res.data.resources,
        });
        console.log(this.state.resources);
      });
  }
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  componentDidMount() {
    this.onLoad();
  }
  render() {
    const { resources } = this.state;
    return (
      <>
        <span className="center-item" style={{ fontSize: "1.5em" }}>
          Find some interesting facts and useful content curated by experts.
        </span>

        {resources.map((e) => (
          <Card
            style={{
              backgroundColor: "#9052ff",
              borderRadius: "1em",
              marginTop: "2em",
            }}
          >
            <CardBody>
              <span
                className="text-white"
                style={{ fontWeight: "bold", fontSize: "1.5em" }}
              >
                {e.name}
              </span>
              <br />
              <span className="text-white" style={{ fontSize: "1em" }}>
                {e.text}
              </span>
              <br />
            </CardBody>
          </Card>
        ))}
      </>
    );
  }
}
Notes.propTypes = {
  auth: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tutor: state.tutor,
});
export default connect(mapStateToProps)(Notes);
