import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task-output.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskOutputDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskOutputDetail = (props: ITaskOutputDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskOutputEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taskOutputDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.taskOutput.detail.title">TaskOutput</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{taskOutputEntity.id}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskOutput.status">Status</Translate>
            </span>
          </dt>
          <dd>{taskOutputEntity.status}</dd>
          <dt>
            <span id="errorOutput">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskOutput.errorOutput">Error Output</Translate>
            </span>
          </dt>
          <dd>{taskOutputEntity.errorOutput}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.taskOutput.response">Response</Translate>
          </dt>
          <dd>{taskOutputEntity.response ? taskOutputEntity.response.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.taskOutput.taskResponse">Task Response</Translate>
          </dt>
          <dd>{taskOutputEntity.taskResponse ? taskOutputEntity.taskResponse.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/task-output" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task-output/${taskOutputEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ taskOutput }: IRootState) => ({
  taskOutputEntity: taskOutput.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskOutputDetail);
