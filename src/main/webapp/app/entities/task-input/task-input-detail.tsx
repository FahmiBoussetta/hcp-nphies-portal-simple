import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task-input.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskInputDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskInputDetail = (props: ITaskInputDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskInputEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taskInputDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.detail.title">TaskInput</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{taskInputEntity.id}</dd>
          <dt>
            <span id="inputInclude">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputInclude">Input Include</Translate>
            </span>
          </dt>
          <dd>{taskInputEntity.inputInclude}</dd>
          <dt>
            <span id="inputExclude">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputExclude">Input Exclude</Translate>
            </span>
          </dt>
          <dd>{taskInputEntity.inputExclude}</dd>
          <dt>
            <span id="inputIncludeMessage">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputIncludeMessage">Input Include Message</Translate>
            </span>
          </dt>
          <dd>{taskInputEntity.inputIncludeMessage}</dd>
          <dt>
            <span id="inputExcludeMessage">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputExcludeMessage">Input Exclude Message</Translate>
            </span>
          </dt>
          <dd>{taskInputEntity.inputExcludeMessage}</dd>
          <dt>
            <span id="inputCount">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputCount">Input Count</Translate>
            </span>
          </dt>
          <dd>{taskInputEntity.inputCount}</dd>
          <dt>
            <span id="inputStart">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputStart">Input Start</Translate>
            </span>
          </dt>
          <dd>
            {taskInputEntity.inputStart ? <TextFormat value={taskInputEntity.inputStart} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="inputEnd">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputEnd">Input End</Translate>
            </span>
          </dt>
          <dd>{taskInputEntity.inputEnd ? <TextFormat value={taskInputEntity.inputEnd} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="inputLineItem">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputLineItem">Input Line Item</Translate>
            </span>
          </dt>
          <dd>{taskInputEntity.inputLineItem}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputOrigResponse">Input Orig Response</Translate>
          </dt>
          <dd>{taskInputEntity.inputOrigResponse ? taskInputEntity.inputOrigResponse.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.task">Task</Translate>
          </dt>
          <dd>{taskInputEntity.task ? taskInputEntity.task.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/task-input" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task-input/${taskInputEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ taskInput }: IRootState) => ({
  taskInputEntity: taskInput.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskInputDetail);
