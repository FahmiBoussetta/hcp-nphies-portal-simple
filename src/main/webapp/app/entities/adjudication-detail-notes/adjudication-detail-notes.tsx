import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './adjudication-detail-notes.reducer';
import { IAdjudicationDetailNotes } from 'app/shared/model/adjudication-detail-notes.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdjudicationDetailNotesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AdjudicationDetailNotes = (props: IAdjudicationDetailNotesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { adjudicationDetailNotesList, match, loading } = props;
  return (
    <div>
      <h2 id="adjudication-detail-notes-heading" data-cy="AdjudicationDetailNotesHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailNotes.home.title">Adjudication Detail Notes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailNotes.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailNotes.home.createLabel">
              Create new Adjudication Detail Notes
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {adjudicationDetailNotesList && adjudicationDetailNotesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailNotes.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailNotes.note">Note</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailNotes.adjudicationDetailItem">
                    Adjudication Detail Item
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adjudicationDetailNotesList.map((adjudicationDetailNotes, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${adjudicationDetailNotes.id}`} color="link" size="sm">
                      {adjudicationDetailNotes.id}
                    </Button>
                  </td>
                  <td>{adjudicationDetailNotes.note}</td>
                  <td>
                    {adjudicationDetailNotes.adjudicationDetailItem ? (
                      <Link to={`adjudication-detail-item/${adjudicationDetailNotes.adjudicationDetailItem.id}`}>
                        {adjudicationDetailNotes.adjudicationDetailItem.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudicationDetailNotes.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudicationDetailNotes.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudicationDetailNotes.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailNotes.home.notFound">
                No Adjudication Detail Notes found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adjudicationDetailNotes }: IRootState) => ({
  adjudicationDetailNotesList: adjudicationDetailNotes.entities,
  loading: adjudicationDetailNotes.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdjudicationDetailNotes);
