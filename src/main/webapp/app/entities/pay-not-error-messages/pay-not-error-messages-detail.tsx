import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pay-not-error-messages.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPayNotErrorMessagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PayNotErrorMessagesDetail = (props: IPayNotErrorMessagesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { payNotErrorMessagesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="payNotErrorMessagesDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.payNotErrorMessages.detail.title">PayNotErrorMessages</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{payNotErrorMessagesEntity.id}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="hcpNphiesPortalSimpleApp.payNotErrorMessages.message">Message</Translate>
            </span>
          </dt>
          <dd>{payNotErrorMessagesEntity.message}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.payNotErrorMessages.paymentNotice">Payment Notice</Translate>
          </dt>
          <dd>{payNotErrorMessagesEntity.paymentNotice ? payNotErrorMessagesEntity.paymentNotice.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/pay-not-error-messages" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pay-not-error-messages/${payNotErrorMessagesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ payNotErrorMessages }: IRootState) => ({
  payNotErrorMessagesEntity: payNotErrorMessages.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayNotErrorMessagesDetail);
