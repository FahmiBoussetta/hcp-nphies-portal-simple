import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reconciliation-detail-item.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReconciliationDetailItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReconciliationDetailItemDetail = (props: IReconciliationDetailItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { reconciliationDetailItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reconciliationDetailItemDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.detail.title">ReconciliationDetailItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{reconciliationDetailItemEntity.id}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{reconciliationDetailItemEntity.identifier}</dd>
          <dt>
            <span id="predecessor">
              <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.predecessor">Predecessor</Translate>
            </span>
          </dt>
          <dd>{reconciliationDetailItemEntity.predecessor}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.type">Type</Translate>
            </span>
          </dt>
          <dd>{reconciliationDetailItemEntity.type}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.date">Date</Translate>
            </span>
          </dt>
          <dd>
            {reconciliationDetailItemEntity.date ? (
              <TextFormat value={reconciliationDetailItemEntity.date} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="amount">
              <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{reconciliationDetailItemEntity.amount}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.request">Request</Translate>
          </dt>
          <dd>{reconciliationDetailItemEntity.request ? reconciliationDetailItemEntity.request.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.submitter">Submitter</Translate>
          </dt>
          <dd>{reconciliationDetailItemEntity.submitter ? reconciliationDetailItemEntity.submitter.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.response">Response</Translate>
          </dt>
          <dd>{reconciliationDetailItemEntity.response ? reconciliationDetailItemEntity.response.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.payee">Payee</Translate>
          </dt>
          <dd>{reconciliationDetailItemEntity.payee ? reconciliationDetailItemEntity.payee.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.reconciliationDetailItem.paymentReconciliation">
              Payment Reconciliation
            </Translate>
          </dt>
          <dd>{reconciliationDetailItemEntity.paymentReconciliation ? reconciliationDetailItemEntity.paymentReconciliation.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/reconciliation-detail-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reconciliation-detail-item/${reconciliationDetailItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ reconciliationDetailItem }: IRootState) => ({
  reconciliationDetailItemEntity: reconciliationDetailItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReconciliationDetailItemDetail);
