import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './adjudication-notes.reducer';
import { IAdjudicationNotes } from 'app/shared/model/adjudication-notes.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdjudicationNotesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AdjudicationNotes = (props: IAdjudicationNotesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { adjudicationNotesList, match, loading } = props;
  return (
    <div>
      <h2 id="adjudication-notes-heading" data-cy="AdjudicationNotesHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationNotes.home.title">Adjudication Notes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationNotes.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationNotes.home.createLabel">Create new Adjudication Notes</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {adjudicationNotesList && adjudicationNotesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationNotes.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationNotes.note">Note</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationNotes.adjudicationItem">Adjudication Item</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adjudicationNotesList.map((adjudicationNotes, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${adjudicationNotes.id}`} color="link" size="sm">
                      {adjudicationNotes.id}
                    </Button>
                  </td>
                  <td>{adjudicationNotes.note}</td>
                  <td>
                    {adjudicationNotes.adjudicationItem ? (
                      <Link to={`adjudication-item/${adjudicationNotes.adjudicationItem.id}`}>{adjudicationNotes.adjudicationItem.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${adjudicationNotes.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudicationNotes.id}/edit`}
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
                        to={`${match.url}/${adjudicationNotes.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationNotes.home.notFound">No Adjudication Notes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adjudicationNotes }: IRootState) => ({
  adjudicationNotesList: adjudicationNotes.entities,
  loading: adjudicationNotes.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdjudicationNotes);
