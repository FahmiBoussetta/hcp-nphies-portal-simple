import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cov-eli-error-messages.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICovEliErrorMessagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CovEliErrorMessagesDetail = (props: ICovEliErrorMessagesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { covEliErrorMessagesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="covEliErrorMessagesDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.covEliErrorMessages.detail.title">CovEliErrorMessages</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{covEliErrorMessagesEntity.id}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="hcpNphiesPortalSimpleApp.covEliErrorMessages.message">Message</Translate>
            </span>
          </dt>
          <dd>{covEliErrorMessagesEntity.message}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.covEliErrorMessages.coverageEligibilityRequest">
              Coverage Eligibility Request
            </Translate>
          </dt>
          <dd>{covEliErrorMessagesEntity.coverageEligibilityRequest ? covEliErrorMessagesEntity.coverageEligibilityRequest.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/cov-eli-error-messages" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cov-eli-error-messages/${covEliErrorMessagesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ covEliErrorMessages }: IRootState) => ({
  covEliErrorMessagesEntity: covEliErrorMessages.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CovEliErrorMessagesDetail);
