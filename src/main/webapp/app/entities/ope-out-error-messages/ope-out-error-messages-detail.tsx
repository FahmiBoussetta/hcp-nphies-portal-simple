import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ope-out-error-messages.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOpeOutErrorMessagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OpeOutErrorMessagesDetail = (props: IOpeOutErrorMessagesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { opeOutErrorMessagesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="opeOutErrorMessagesDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.opeOutErrorMessages.detail.title">OpeOutErrorMessages</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{opeOutErrorMessagesEntity.id}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="hcpNphiesPortalSimpleApp.opeOutErrorMessages.message">Message</Translate>
            </span>
          </dt>
          <dd>{opeOutErrorMessagesEntity.message}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.opeOutErrorMessages.operationOutcome">Operation Outcome</Translate>
          </dt>
          <dd>{opeOutErrorMessagesEntity.operationOutcome ? opeOutErrorMessagesEntity.operationOutcome.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ope-out-error-messages" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ope-out-error-messages/${opeOutErrorMessagesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ opeOutErrorMessages }: IRootState) => ({
  opeOutErrorMessagesEntity: opeOutErrorMessages.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OpeOutErrorMessagesDetail);
