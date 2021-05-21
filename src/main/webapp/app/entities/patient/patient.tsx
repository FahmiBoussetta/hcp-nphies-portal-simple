import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './patient.reducer';
import { IPatient } from 'app/shared/model/patient.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPatientProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Patient = (props: IPatientProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { patientList, match, loading } = props;
  return (
    <div>
      <h2 id="patient-heading" data-cy="PatientHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.patient.home.title">Patients</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.patient.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.patient.home.createLabel">Create new Patient</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {patientList && patientList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.guid">Guid</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.forceId">Force Id</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.residentNumber">Resident Number</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.passportNumber">Passport Number</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.nationalHealthId">National Health Id</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.iqama">Iqama</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.religion">Religion</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.maritalStatus">Marital Status</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.contacts">Contacts</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.address">Address</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {patientList.map((patient, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${patient.id}`} color="link" size="sm">
                      {patient.id}
                    </Button>
                  </td>
                  <td>{patient.guid}</td>
                  <td>{patient.forceId}</td>
                  <td>{patient.residentNumber}</td>
                  <td>{patient.passportNumber}</td>
                  <td>{patient.nationalHealthId}</td>
                  <td>{patient.iqama}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.ReligionEnum.${patient.religion}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.AdministrativeGenderEnum.${patient.gender}`} />
                  </td>
                  <td>{patient.start ? <TextFormat type="date" value={patient.start} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{patient.end ? <TextFormat type="date" value={patient.end} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.MaritalStatusEnum.${patient.maritalStatus}`} />
                  </td>
                  <td>{patient.contacts ? <Link to={`contact/${patient.contacts.id}`}>{patient.contacts.id}</Link> : ''}</td>
                  <td>{patient.address ? <Link to={`address/${patient.address.id}`}>{patient.address.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${patient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${patient.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${patient.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="hcpNphiesPortalSimpleApp.patient.home.notFound">No Patients found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ patient }: IRootState) => ({
  patientList: patient.entities,
  loading: patient.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
