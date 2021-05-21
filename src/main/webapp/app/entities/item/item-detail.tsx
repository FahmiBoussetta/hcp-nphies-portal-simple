import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './item.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ItemDetail = (props: IItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { itemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="itemDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.item.detail.title">Item</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{itemEntity.id}</dd>
          <dt>
            <span id="sequence">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.sequence">Sequence</Translate>
            </span>
          </dt>
          <dd>{itemEntity.sequence}</dd>
          <dt>
            <span id="isPackage">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.isPackage">Is Package</Translate>
            </span>
          </dt>
          <dd>{itemEntity.isPackage ? 'true' : 'false'}</dd>
          <dt>
            <span id="tax">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.tax">Tax</Translate>
            </span>
          </dt>
          <dd>{itemEntity.tax}</dd>
          <dt>
            <span id="payerShare">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.payerShare">Payer Share</Translate>
            </span>
          </dt>
          <dd>{itemEntity.payerShare}</dd>
          <dt>
            <span id="patientShare">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.patientShare">Patient Share</Translate>
            </span>
          </dt>
          <dd>{itemEntity.patientShare}</dd>
          <dt>
            <span id="careTeamSequence">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.careTeamSequence">Care Team Sequence</Translate>
            </span>
          </dt>
          <dd>{itemEntity.careTeamSequence}</dd>
          <dt>
            <span id="transportationSRCA">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.transportationSRCA">Transportation SRCA</Translate>
            </span>
          </dt>
          <dd>{itemEntity.transportationSRCA}</dd>
          <dt>
            <span id="imaging">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.imaging">Imaging</Translate>
            </span>
          </dt>
          <dd>{itemEntity.imaging}</dd>
          <dt>
            <span id="laboratory">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.laboratory">Laboratory</Translate>
            </span>
          </dt>
          <dd>{itemEntity.laboratory}</dd>
          <dt>
            <span id="medicalDevice">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.medicalDevice">Medical Device</Translate>
            </span>
          </dt>
          <dd>{itemEntity.medicalDevice}</dd>
          <dt>
            <span id="oralHealthIP">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.oralHealthIP">Oral Health IP</Translate>
            </span>
          </dt>
          <dd>{itemEntity.oralHealthIP}</dd>
          <dt>
            <span id="oralHealthOP">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.oralHealthOP">Oral Health OP</Translate>
            </span>
          </dt>
          <dd>{itemEntity.oralHealthOP}</dd>
          <dt>
            <span id="procedure">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.procedure">Procedure</Translate>
            </span>
          </dt>
          <dd>{itemEntity.procedure}</dd>
          <dt>
            <span id="services">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.services">Services</Translate>
            </span>
          </dt>
          <dd>{itemEntity.services}</dd>
          <dt>
            <span id="medicationCode">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.medicationCode">Medication Code</Translate>
            </span>
          </dt>
          <dd>{itemEntity.medicationCode}</dd>
          <dt>
            <span id="servicedDate">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.servicedDate">Serviced Date</Translate>
            </span>
          </dt>
          <dd>{itemEntity.servicedDate ? <TextFormat value={itemEntity.servicedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="servicedDateStart">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.servicedDateStart">Serviced Date Start</Translate>
            </span>
          </dt>
          <dd>
            {itemEntity.servicedDateStart ? <TextFormat value={itemEntity.servicedDateStart} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="servicedDateEnd">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.servicedDateEnd">Serviced Date End</Translate>
            </span>
          </dt>
          <dd>
            {itemEntity.servicedDateEnd ? <TextFormat value={itemEntity.servicedDateEnd} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{itemEntity.quantity}</dd>
          <dt>
            <span id="unitPrice">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.unitPrice">Unit Price</Translate>
            </span>
          </dt>
          <dd>{itemEntity.unitPrice}</dd>
          <dt>
            <span id="factor">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.factor">Factor</Translate>
            </span>
          </dt>
          <dd>{itemEntity.factor}</dd>
          <dt>
            <span id="bodySite">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.bodySite">Body Site</Translate>
            </span>
          </dt>
          <dd>{itemEntity.bodySite}</dd>
          <dt>
            <span id="subSite">
              <Translate contentKey="hcpNphiesPortalSimpleApp.item.subSite">Sub Site</Translate>
            </span>
          </dt>
          <dd>{itemEntity.subSite}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.item.claim">Claim</Translate>
          </dt>
          <dd>{itemEntity.claim ? itemEntity.claim.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/item/${itemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ item }: IRootState) => ({
  itemEntity: item.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
