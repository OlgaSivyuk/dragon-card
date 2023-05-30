import React, {Component} from 'react';
import {connect} from 'react-redux';
import {  Col,  Form,  Input,  Row,  Table,} from "antd";
import withRouter from "../../../../hoc/withRouter";
import {  addAnswer, changeInput} from "../../../../store/actions/campaign";
import Services from "../../../../services/Services";
import classes from "./campaignDetails.module.scss";
import AddConditionBtn from "../../../ui/AddConditionBtn";
import uuid from "../../../../services/uuid";


class CampaignDetails extends Component {
  campaignDetail = React.createRef();
  videoFormRef = React.createRef();

 
  state = {

    questionsValue: '', 
    answerValue: '' 
  }

  render() {
    const { campaignDetail,  changeInput} = this.props;

    const conditionQuestion = () => {
        const { questionValue } = this.state;
        const { answerValue } = this.state;
      return <>
        {campaignDetail?.questions.map((el, ind) => {
          return <div key={el.id}>
            <div className={classes.wrapper}>
              <label>Вопрос</label>
              <Input.TextArea 
              rows={4}
              name="questions" 
              value={questionValue}
              />
              <span onClick={() => this.props.addCondition("questions", el.campaignQuestionGuid)} className={classes.delete}>{Services.mapIconItem("closeRound")}</span>
            </div>
            <div>
              <div className={classes.wrapper}>
                <label style={{marginTop: 8}}>Варианты ответа</label>
                {el.answers.map((i, ind )=> {
                  return <div className={classes.wrapper} key={uuid()}>
                    <Input 
                    value={answerValue[ind]}
                    name="answers" 
                    
                    />
                    {ind > 0 && <span onClick={() => this.props.addAnswer("answers", el.campaignQuestionGuid, ind)} className={classes.delete}>{Services.mapIconItem("closeRound")}</span>}

                  </div>
                })}
              </div>
            </div>
            <AddConditionBtn type="plus" style={{margin: "10px 0 20px"}} title="Добавить вариант" onClick={() => this.props.addAnswer("answers", el.campaignQuestionGuid, "add")}/>
          </div>
        })}
        <AddConditionBtn type="plus" title="Добавить вопрос" onClick={() => this.props.addCondition("questions", uuid(), "add")}/>
      </>
    }
    const tableData = [
      {
        key: uuid(),
        questions: conditionQuestion(),
      }
    ]
    const columns = [

      {
        title: 'Вопросы',
        dataIndex: 'questions',
        key: 'questions',
      },
    ]

    return (
      <Row>
        <Col span={24}>
          <Form layout="vertical">
            <Table
              columns={columns}
              dataSource={tableData}
              className={classes.table}
            />
          </Form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaignDetail: state.campaign.campaignDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAnswer: (typeAnswer, answerId, answerActionForm) => dispatch(addAnswer({typeAnswer, answerId, answerActionForm})),
    changeInput: (name, value, form, uuid, ind) => dispatch(changeInput({name, value,form, uuid, ind})),
  };
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(CampaignDetails));