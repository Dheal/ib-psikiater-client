import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import API from "../../API/mainServer";
import swal from "sweetalert";
import "./index.css";
import {
  Container,
  Form,
  Col,
  Row,
  Image,
  Button,
  InputGroup,
  Card,
} from "react-bootstrap";
import moment from "moment";
import userAction from "../../redux/actions/userAction";
import ModalProfile from "./ModalProfile";

const Index = () => {
  const [workDays, setWorkDays] = useState([""]);
  const [workTimes, setWorkTimes] = useState([""]);
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const accesstoken = localStorage.getItem("accesstoken");
  const psikiater = useSelector((store) => store.user.user_data);
  const psikiater_id = psikiater._id;

  useEffect(() => {
    console.log(psikiater);
    console.log(psikiater_id);
  }, []);

  useEffect(() => {
    console.log(workDays);
    console.log(workTimes);
  }, [workDays, workTimes]);

  // const callback = () => {
  //   location.reload();
  // };

  const updateButtonHandler = () => {
    dispatch(
      userAction.changePsikiaterSchedule(
        psikiater_id,
        accesstoken,
        workDays,
        workTimes
      )
    );
    swal("Schedule Updated!", "", "success");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const workDaysHandler = (e) => {
    setWorkDays(e.target.value.split(", "));
  };

  const workTimesHandler = (e) => {
    setWorkTimes(e.target.value.split(", "));
  };

  return (
    <>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "50px",
          color: "#70a1ff",
        }}
      >
        Profile
      </h1>
      <Container>
        <Card className="profile-psikiater-card-wrapper">
          <Row>
            <Col md={12} lg={6}>
              <Image
                className="profile-psikiater-avatar"
                src={
                  psikiater.avatar_url === ""
                    ? "../images/pic04.jpg"
                    : psikiater.avatar_url
                }
              ></Image>
            </Col>
            <Col md={12} lg={6} className="profile-psikiater-main-column-1">
              <Form>
                <Row>
                  <Col lg={6} md={12}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={`${psikiater.first_name} ${psikiater.last_name}`}
                      readOnly
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control value={`${psikiater.gender}`} readOnly />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={12}>
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control
                      value={moment(`${psikiater.date_of_birth}`).format(
                        "DD MMMM YYYY"
                      )}
                      readOnly
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={psikiater.email} readOnly />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} lg={6}>
                    <Form.Label>Specialize</Form.Label>
                    <Form.Control value={psikiater.specialize} readOnly />
                  </Col>
                  <Col md={12} lg={6}>
                    <Form.Label>Experience Year</Form.Label>
                    <Form.Control
                      value={psikiater.info.experience_year}
                      readOnly
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Work Days & Work Times</Form.Label>
                    {psikiater.schedule.work_days.length === 0 &&
                    psikiater.schedule.work_time.length === 0 ? (
                      <>
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Input Your Work Days"
                            onChange={workDaysHandler}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Input Your Work Times"
                            onChange={workTimesHandler}
                          />
                        </InputGroup>

                        <Button
                          variant="outline-dark"
                          disabled={
                            workDays.includes("") && workTimes.includes("")
                              ? true
                              : false
                          }
                          onClick={updateButtonHandler}
                        >
                          Update
                        </Button>
                      </>
                    ) : (
                      <>
                        <Row>
                          <Col>
                            {psikiater.schedule.work_days.map((days) => (
                              <li>{days}</li>
                            ))}
                          </Col>
                          <Col>
                            {psikiater.schedule.work_time.map((times) => (
                              <li>{times}</li>
                            ))}
                          </Col>
                        </Row>
                        <Container>
                          <Button
                            variant="outline-dark"
                            onClick={() => setModalShow(true)}
                            style={{
                              display: "flex",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            Update
                          </Button>
                          <ModalProfile
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </Container>
                      </>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>Work Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      readOnly
                      row={3}
                      value={`${psikiater.work_address}, ${psikiater.info.region}`}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Index;
