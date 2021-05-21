import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './patient.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPatientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PatientDetail = (props: IPatientDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { patientEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="patientDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.patient.detail.title">Patient</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{patientEntity.id}</dd>
          <dt>
            <span id="guid">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.guid">Guid</Translate>
            </span>
          </dt>
          <dd>{patientEntity.guid}</dd>
          <dt>
            <span id="forceId">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.forceId">Force Id</Translate>
            </span>
          </dt>
          <dd>{patientEntity.forceId}</dd>
          <dt>
            <span id="residentNumber">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.residentNumber">Resident Number</Translate>
            </span>
          </dt>
          <dd>{patientEntity.residentNumber}</dd>
          <dt>
            <span id="passportNumber">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.passportNumber">Passport Number</Translate>
            </span>
          </dt>
          <dd>{patientEntity.passportNumber}</dd>
          <dt>
            <span id="nationalHealthId">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.nationalHealthId">National Health Id</Translate>
            </span>
          </dt>
          <dd>{patientEntity.nationalHealthId}</dd>
          <dt>
            <span id="iqama">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.iqama">Iqama</Translate>
            </span>
          </dt>
          <dd>{patientEntity.iqama}</dd>
          <dt>
            <span id="religion">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.religion">Religion</Translate>
            </span>
          </dt>
          <dd>{patientEntity.religion}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{patientEntity.gender}</dd>
          <dt>
            <span id="start">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.start">Start</Translate>
            </span>
          </dt>
          <dd>{patientEntity.start ? <TextFormat value={patientEntity.start} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="end">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.end">End</Translate>
            </span>
          </dt>
          <dd>{patientEntity.end ? <TextFormat value={patientEntity.end} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="maritalStatus">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.maritalStatus">Marital Status</Translate>
            </span>
          </dt>
          <dd>{patientEntity.maritalStatus}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.patient.contacts">Contacts</Translate>
          </dt>
          <dd>{patientEntity.contacts ? patientEntity.contacts.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.patient.address">Address</Translate>
          </dt>
          <dd>{patientEntity.address ? patientEntity.address.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/patient" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/patient/${patientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ patient }: IRootState) => ({
  patientEntity: patient.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
