import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './communication-request.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommunicationRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommunicationRequestDetail = (props: ICommunicationRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { communicationRequestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="communicationRequestDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.detail.title">CommunicationRequest</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{communicationRequestEntity.id}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.value">Value</Translate>
            </span>
          </dt>
          <dd>{communicationRequestEntity.value}</dd>
          <dt>
            <span id="system">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.system">System</Translate>
            </span>
          </dt>
          <dd>{communicationRequestEntity.system}</dd>
          <dt>
            <span id="parsed">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.parsed">Parsed</Translate>
            </span>
          </dt>
          <dd>{communicationRequestEntity.parsed}</dd>
          <dt>
            <span id="limitDate">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.limitDate">Limit Date</Translate>
            </span>
          </dt>
          <dd>
            {communicationRequestEntity.limitDate ? (
              <TextFormat value={communicationRequestEntity.limitDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.subject">Subject</Translate>
          </dt>
          <dd>{communicationRequestEntity.subject ? communicationRequestEntity.subject.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.about">About</Translate>
          </dt>
          <dd>{communicationRequestEntity.about ? communicationRequestEntity.about.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.sender">Sender</Translate>
          </dt>
          <dd>{communicationRequestEntity.sender ? communicationRequestEntity.sender.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.communicationRequest.communication">Communication</Translate>
          </dt>
          <dd>{communicationRequestEntity.communication ? communicationRequestEntity.communication.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/communication-request" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/communication-request/${communicationRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ communicationRequest }: IRootState) => ({
  communicationRequestEntity: communicationRequest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommunicationRequestDetail);
