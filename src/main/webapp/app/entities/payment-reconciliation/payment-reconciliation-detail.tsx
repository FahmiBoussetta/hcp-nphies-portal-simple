import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payment-reconciliation.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentReconciliationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaymentReconciliationDetail = (props: IPaymentReconciliationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paymentReconciliationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentReconciliationDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.detail.title">PaymentReconciliation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{paymentReconciliationEntity.id}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.value">Value</Translate>
            </span>
          </dt>
          <dd>{paymentReconciliationEntity.value}</dd>
          <dt>
            <span id="system">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.system">System</Translate>
            </span>
          </dt>
          <dd>{paymentReconciliationEntity.system}</dd>
          <dt>
            <span id="parsed">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.parsed">Parsed</Translate>
            </span>
          </dt>
          <dd>{paymentReconciliationEntity.parsed}</dd>
          <dt>
            <span id="periodStart">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.periodStart">Period Start</Translate>
            </span>
          </dt>
          <dd>
            {paymentReconciliationEntity.periodStart ? (
              <TextFormat value={paymentReconciliationEntity.periodStart} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="periodEnd">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.periodEnd">Period End</Translate>
            </span>
          </dt>
          <dd>
            {paymentReconciliationEntity.periodEnd ? (
              <TextFormat value={paymentReconciliationEntity.periodEnd} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="outcome">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.outcome">Outcome</Translate>
            </span>
          </dt>
          <dd>{paymentReconciliationEntity.outcome}</dd>
          <dt>
            <span id="disposition">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.disposition">Disposition</Translate>
            </span>
          </dt>
          <dd>{paymentReconciliationEntity.disposition}</dd>
          <dt>
            <span id="paymentAmount">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.paymentAmount">Payment Amount</Translate>
            </span>
          </dt>
          <dd>{paymentReconciliationEntity.paymentAmount}</dd>
          <dt>
            <span id="paymentIdentifier">
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.paymentIdentifier">Payment Identifier</Translate>
            </span>
          </dt>
          <dd>{paymentReconciliationEntity.paymentIdentifier}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.paymentIssuer">Payment Issuer</Translate>
          </dt>
          <dd>{paymentReconciliationEntity.paymentIssuer ? paymentReconciliationEntity.paymentIssuer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/payment-reconciliation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-reconciliation/${paymentReconciliationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ paymentReconciliation }: IRootState) => ({
  paymentReconciliationEntity: paymentReconciliation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentReconciliationDetail);
