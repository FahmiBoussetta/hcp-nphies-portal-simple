import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './task-input.reducer';
import { ITaskInput } from 'app/shared/model/task-input.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskInputProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TaskInput = (props: ITaskInputProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { taskInputList, match, loading } = props;
  return (
    <div>
      <h2 id="task-input-heading" data-cy="TaskInputHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.home.title">Task Inputs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.home.createLabel">Create new Task Input</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {taskInputList && taskInputList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputInclude">Input Include</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputExclude">Input Exclude</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputIncludeMessage">Input Include Message</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputExcludeMessage">Input Exclude Message</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputCount">Input Count</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputStart">Input Start</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputEnd">Input End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputLineItem">Input Line Item</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputOrigResponse">Input Orig Response</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.task">Task</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {taskInputList.map((taskInput, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${taskInput.id}`} color="link" size="sm">
                      {taskInput.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.ResourceTypeEnum.${taskInput.inputInclude}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.ResourceTypeEnum.${taskInput.inputExclude}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.EventCodingEnum.${taskInput.inputIncludeMessage}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.EventCodingEnum.${taskInput.inputExcludeMessage}`} />
                  </td>
                  <td>{taskInput.inputCount}</td>
                  <td>{taskInput.inputStart ? <TextFormat type="date" value={taskInput.inputStart} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{taskInput.inputEnd ? <TextFormat type="date" value={taskInput.inputEnd} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{taskInput.inputLineItem}</td>
                  <td>
                    {taskInput.inputOrigResponse ? (
                      <Link to={`reference-identifier/${taskInput.inputOrigResponse.id}`}>{taskInput.inputOrigResponse.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{taskInput.task ? <Link to={`task/${taskInput.task.id}`}>{taskInput.task.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${taskInput.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${taskInput.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${taskInput.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.home.notFound">No Task Inputs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ taskInput }: IRootState) => ({
  taskInputList: taskInput.entities,
  loading: taskInput.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskInput);
