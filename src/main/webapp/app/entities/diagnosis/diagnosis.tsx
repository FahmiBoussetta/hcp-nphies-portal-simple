import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './diagnosis.reducer';
import { IDiagnosis } from 'app/shared/model/diagnosis.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiagnosisProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Diagnosis = (props: IDiagnosisProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { diagnosisList, match, loading } = props;
  return (
    <div>
      <h2 id="diagnosis-heading" data-cy="DiagnosisHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.home.title">Diagnoses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.home.createLabel">Create new Diagnosis</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {diagnosisList && diagnosisList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.sequence">Sequence</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.diagnosis">Diagnosis</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.onAdmission">On Admission</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.claim">Claim</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {diagnosisList.map((diagnosis, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${diagnosis.id}`} color="link" size="sm">
                      {diagnosis.id}
                    </Button>
                  </td>
                  <td>{diagnosis.sequence}</td>
                  <td>{diagnosis.diagnosis}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.DiagnosisTypeEnum.${diagnosis.type}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.DiagnosisOnAdmissionEnum.${diagnosis.onAdmission}`} />
                  </td>
                  <td>{diagnosis.claim ? <Link to={`claim/${diagnosis.claim.id}`}>{diagnosis.claim.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${diagnosis.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${diagnosis.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${diagnosis.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.home.notFound">No Diagnoses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ diagnosis }: IRootState) => ({
  diagnosisList: diagnosis.entities,
  loading: diagnosis.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Diagnosis);
