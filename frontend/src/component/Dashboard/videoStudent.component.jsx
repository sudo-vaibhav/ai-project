import React from "react";
import { Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { backendURL } from "../../utils/backURL";
import Player from "react-player";
class VideoStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: "",
      videos: [],
    };
  }
  onLoad() {
    const { myTutor } = this.props.tutor;
    axios
      .post(`${backendURL}/test/orgs/viewVideos`, {
        teacherId: myTutor.myTutor,
        token: `${localStorage.getItem("jwtToken").split(" ")[1]}`,
      })
      .then((res) => {
        console.log("faculties localhost", res.data);
        this.setState({
          ...res.data,
        });
        console.log(this.state.videos);
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
    return (
      <>
        <span className="center-item" style={{ fontSize: "1.5em" }}>
          Watch an introductory video shot by this faculty for you.
        </span>

        <br style={{ marginTop: "2em", marginBottom: "2em" }}></br>
        <br />
        <span className="center-item" style={{ fontSize: "1em" }}>
          Demo video
        </span>
        <br />
        <br />
        <div className="center-item">
          {this.state?.introVideo && <Player url={this.state.introVideo} />}
        </div>
        <br />
        <br />
        {/* <span className="center-item" style={{ fontSize: "1em" }}>
          Course Materials
        </span> */}
        <br />
        <br />

        {/* {videos.map((e) => (
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
        ))} */}
      </>
    );
  }
}
VideoStudent.propTypes = {
  auth: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tutor: state.tutor,
});
export default connect(mapStateToProps)(VideoStudent);
