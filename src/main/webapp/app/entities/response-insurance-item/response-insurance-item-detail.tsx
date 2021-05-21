import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './response-insurance-item.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResponseInsuranceItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResponseInsuranceItemDetail = (props: IResponseInsuranceItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { responseInsuranceItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="responseInsuranceItemDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.detail.title">ResponseInsuranceItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{responseInsuranceItemEntity.id}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.category">Category</Translate>
            </span>
          </dt>
          <dd>{responseInsuranceItemEntity.category}</dd>
          <dt>
            <span id="excluded">
              <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.excluded">Excluded</Translate>
            </span>
          </dt>
          <dd>{responseInsuranceItemEntity.excluded ? 'true' : 'false'}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.name">Name</Translate>
            </span>
          </dt>
          <dd>{responseInsuranceItemEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.description">Description</Translate>
            </span>
          </dt>
          <dd>{responseInsuranceItemEntity.description}</dd>
          <dt>
            <span id="network">
              <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.network">Network</Translate>
            </span>
          </dt>
          <dd>{responseInsuranceItemEntity.network}</dd>
          <dt>
            <span id="unit">
              <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.unit">Unit</Translate>
            </span>
          </dt>
          <dd>{responseInsuranceItemEntity.unit}</dd>
          <dt>
            <span id="term">
              <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.term">Term</Translate>
            </span>
          </dt>
          <dd>{responseInsuranceItemEntity.term}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.responseInsuranceItem.responseInsurance">Response Insurance</Translate>
          </dt>
          <dd>{responseInsuranceItemEntity.responseInsurance ? responseInsuranceItemEntity.responseInsurance.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/response-insurance-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/response-insurance-item/${responseInsuranceItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ responseInsuranceItem }: IRootState) => ({
  responseInsuranceItemEntity: responseInsuranceItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResponseInsuranceItemDetail);
