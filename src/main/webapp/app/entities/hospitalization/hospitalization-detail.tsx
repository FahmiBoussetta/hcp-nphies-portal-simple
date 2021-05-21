import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hospitalization.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHospitalizationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HospitalizationDetail = (props: IHospitalizationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { hospitalizationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="hospitalizationDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.detail.title">Hospitalization</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{hospitalizationEntity.id}</dd>
          <dt>
            <span id="admitSource">
              <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.admitSource">Admit Source</Translate>
            </span>
          </dt>
          <dd>{hospitalizationEntity.admitSource}</dd>
          <dt>
            <span id="reAdmission">
              <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.reAdmission">Re Admission</Translate>
            </span>
          </dt>
          <dd>{hospitalizationEntity.reAdmission}</dd>
          <dt>
            <span id="dischargeDisposition">
              <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.dischargeDisposition">Discharge Disposition</Translate>
            </span>
          </dt>
          <dd>{hospitalizationEntity.dischargeDisposition}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.origin">Origin</Translate>
          </dt>
          <dd>{hospitalizationEntity.origin ? hospitalizationEntity.origin.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/hospitalization" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/hospitalization/${hospitalizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ hospitalization }: IRootState) => ({
  hospitalizationEntity: hospitalization.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HospitalizationDetail);
