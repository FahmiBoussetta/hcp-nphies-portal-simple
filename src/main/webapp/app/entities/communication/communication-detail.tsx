import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './communication.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommunicationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommunicationDetail = (props: ICommunicationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { communicationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="communicationDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.communication.detail.title">Communication</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{communicationEntity.id}</dd>
          <dt>
            <span id="guid">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communication.guid">Guid</Translate>
            </span>
          </dt>
          <dd>{communicationEntity.guid}</dd>
          <dt>
            <span id="isQueued">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communication.isQueued">Is Queued</Translate>
            </span>
          </dt>
          <dd>{communicationEntity.isQueued ? 'true' : 'false'}</dd>
          <dt>
            <span id="parsed">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communication.parsed">Parsed</Translate>
            </span>
          </dt>
          <dd>{communicationEntity.parsed}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communication.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{communicationEntity.identifier}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="hcpNphiesPortalSimpleApp.communication.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{communicationEntity.priority}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.communication.subject">Subject</Translate>
          </dt>
          <dd>{communicationEntity.subject ? communicationEntity.subject.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.communication.sender">Sender</Translate>
          </dt>
          <dd>{communicationEntity.sender ? communicationEntity.sender.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.communication.recipient">Recipient</Translate>
          </dt>
          <dd>{communicationEntity.recipient ? communicationEntity.recipient.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.communication.about">About</Translate>
          </dt>
          <dd>{communicationEntity.about ? communicationEntity.about.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/communication" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/communication/${communicationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ communication }: IRootState) => ({
  communicationEntity: communication.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommunicationDetail);
