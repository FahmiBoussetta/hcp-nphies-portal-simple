import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sub-detail-item.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubDetailItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubDetailItemDetail = (props: ISubDetailItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { subDetailItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="subDetailItemDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.detail.title">SubDetailItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.id}</dd>
          <dt>
            <span id="sequence">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.sequence">Sequence</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.sequence}</dd>
          <dt>
            <span id="tax">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.tax">Tax</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.tax}</dd>
          <dt>
            <span id="transportationSRCA">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.transportationSRCA">Transportation SRCA</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.transportationSRCA}</dd>
          <dt>
            <span id="imaging">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.imaging">Imaging</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.imaging}</dd>
          <dt>
            <span id="laboratory">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.laboratory">Laboratory</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.laboratory}</dd>
          <dt>
            <span id="medicalDevice">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.medicalDevice">Medical Device</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.medicalDevice}</dd>
          <dt>
            <span id="oralHealthIP">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.oralHealthIP">Oral Health IP</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.oralHealthIP}</dd>
          <dt>
            <span id="oralHealthOP">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.oralHealthOP">Oral Health OP</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.oralHealthOP}</dd>
          <dt>
            <span id="procedure">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.procedure">Procedure</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.procedure}</dd>
          <dt>
            <span id="services">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.services">Services</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.services}</dd>
          <dt>
            <span id="medicationCode">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.medicationCode">Medication Code</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.medicationCode}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.quantity}</dd>
          <dt>
            <span id="unitPrice">
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.unitPrice">Unit Price</Translate>
            </span>
          </dt>
          <dd>{subDetailItemEntity.unitPrice}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.detailItem">Detail Item</Translate>
          </dt>
          <dd>{subDetailItemEntity.detailItem ? subDetailItemEntity.detailItem.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/sub-detail-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sub-detail-item/${subDetailItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ subDetailItem }: IRootState) => ({
  subDetailItemEntity: subDetailItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubDetailItemDetail);
