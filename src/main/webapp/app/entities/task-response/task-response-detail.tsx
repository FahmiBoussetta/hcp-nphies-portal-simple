import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task-response.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskResponseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskResponseDetail = (props: ITaskResponseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskResponseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taskResponseDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.taskResponse.detail.title">TaskResponse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{taskResponseEntity.id}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskResponse.value">Value</Translate>
            </span>
          </dt>
          <dd>{taskResponseEntity.value}</dd>
          <dt>
            <span id="system">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskResponse.system">System</Translate>
            </span>
          </dt>
          <dd>{taskResponseEntity.system}</dd>
          <dt>
            <span id="parsed">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskResponse.parsed">Parsed</Translate>
            </span>
          </dt>
          <dd>{taskResponseEntity.parsed}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskResponse.status">Status</Translate>
            </span>
          </dt>
          <dd>{taskResponseEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/task-response" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task-response/${taskResponseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ taskResponse }: IRootState) => ({
  taskResponseEntity: taskResponse.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskResponseDetail);
