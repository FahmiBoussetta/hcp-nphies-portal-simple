import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './class-component.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClassComponentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClassComponentDetail = (props: IClassComponentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { classComponentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="classComponentDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.classComponent.detail.title">ClassComponent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{classComponentEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="hcpNphiesPortalSimpleApp.classComponent.type">Type</Translate>
            </span>
          </dt>
          <dd>{classComponentEntity.type}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="hcpNphiesPortalSimpleApp.classComponent.value">Value</Translate>
            </span>
          </dt>
          <dd>{classComponentEntity.value}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hcpNphiesPortalSimpleApp.classComponent.name">Name</Translate>
            </span>
          </dt>
          <dd>{classComponentEntity.name}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.classComponent.coverage">Coverage</Translate>
          </dt>
          <dd>{classComponentEntity.coverage ? classComponentEntity.coverage.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/class-component" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/class-component/${classComponentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ classComponent }: IRootState) => ({
  classComponentEntity: classComponent.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponentDetail);
