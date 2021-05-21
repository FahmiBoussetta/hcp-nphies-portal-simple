import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IReferenceIdentifier } from 'app/shared/model/reference-identifier.model';
import { getEntities as getReferenceIdentifiers } from 'app/entities/reference-identifier/reference-identifier.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task-input.reducer';
import { ITaskInput } from 'app/shared/model/task-input.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskInputUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskInputUpdate = (props: ITaskInputUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { taskInputEntity, referenceIdentifiers, tasks, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/task-input');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getReferenceIdentifiers();
    props.getTasks();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.inputStart = convertDateTimeToServer(values.inputStart);
    values.inputEnd = convertDateTimeToServer(values.inputEnd);

    if (errors.length === 0) {
      const entity = {
        ...taskInputEntity,
        ...values,
        inputOrigResponse: referenceIdentifiers.find(it => it.id.toString() === values.inputOrigResponseId.toString()),
        task: tasks.find(it => it.id.toString() === values.taskId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hcpNphiesPortalSimpleApp.taskInput.home.createOrEditLabel" data-cy="TaskInputCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.home.createOrEditLabel">Create or edit a TaskInput</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : taskInputEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="task-input-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="task-input-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="inputIncludeLabel" for="task-input-inputInclude">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputInclude">Input Include</Translate>
                </Label>
                <AvInput
                  id="task-input-inputInclude"
                  data-cy="inputInclude"
                  type="select"
                  className="form-control"
                  name="inputInclude"
                  value={(!isNew && taskInputEntity.inputInclude) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.ResourceTypeEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="inputExcludeLabel" for="task-input-inputExclude">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputExclude">Input Exclude</Translate>
                </Label>
                <AvInput
                  id="task-input-inputExclude"
                  data-cy="inputExclude"
                  type="select"
                  className="form-control"
                  name="inputExclude"
                  value={(!isNew && taskInputEntity.inputExclude) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.ResourceTypeEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="inputIncludeMessageLabel" for="task-input-inputIncludeMessage">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputIncludeMessage">Input Include Message</Translate>
                </Label>
                <AvInput
                  id="task-input-inputIncludeMessage"
                  data-cy="inputIncludeMessage"
                  type="select"
                  className="form-control"
                  name="inputIncludeMessage"
                  value={(!isNew && taskInputEntity.inputIncludeMessage) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.EventCodingEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="inputExcludeMessageLabel" for="task-input-inputExcludeMessage">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputExcludeMessage">Input Exclude Message</Translate>
                </Label>
                <AvInput
                  id="task-input-inputExcludeMessage"
                  data-cy="inputExcludeMessage"
                  type="select"
                  className="form-control"
                  name="inputExcludeMessage"
                  value={(!isNew && taskInputEntity.inputExcludeMessage) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.EventCodingEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="inputCountLabel" for="task-input-inputCount">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputCount">Input Count</Translate>
                </Label>
                <AvField id="task-input-inputCount" data-cy="inputCount" type="string" className="form-control" name="inputCount" />
              </AvGroup>
              <AvGroup>
                <Label id="inputStartLabel" for="task-input-inputStart">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputStart">Input Start</Translate>
                </Label>
                <AvInput
                  id="task-input-inputStart"
                  data-cy="inputStart"
                  type="datetime-local"
                  className="form-control"
                  name="inputStart"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.taskInputEntity.inputStart)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="inputEndLabel" for="task-input-inputEnd">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputEnd">Input End</Translate>
                </Label>
                <AvInput
                  id="task-input-inputEnd"
                  data-cy="inputEnd"
                  type="datetime-local"
                  className="form-control"
                  name="inputEnd"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.taskInputEntity.inputEnd)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="inputLineItemLabel" for="task-input-inputLineItem">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputLineItem">Input Line Item</Translate>
                </Label>
                <AvField
                  id="task-input-inputLineItem"
                  data-cy="inputLineItem"
                  type="string"
                  className="form-control"
                  name="inputLineItem"
                />
              </AvGroup>
              <AvGroup>
                <Label for="task-input-inputOrigResponse">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.inputOrigResponse">Input Orig Response</Translate>
                </Label>
                <AvInput
                  id="task-input-inputOrigResponse"
                  data-cy="inputOrigResponse"
                  type="select"
                  className="form-control"
                  name="inputOrigResponseId"
                >
                  <option value="" key="0" />
                  {referenceIdentifiers
                    ? referenceIdentifiers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="task-input-task">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.taskInput.task">Task</Translate>
                </Label>
                <AvInput id="task-input-task" data-cy="task" type="select" className="form-control" name="taskId">
                  <option value="" key="0" />
                  {tasks
                    ? tasks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/task-input" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  referenceIdentifiers: storeState.referenceIdentifier.entities,
  tasks: storeState.task.entities,
  taskInputEntity: storeState.taskInput.entity,
  loading: storeState.taskInput.loading,
  updating: storeState.taskInput.updating,
  updateSuccess: storeState.taskInput.updateSuccess,
});

const mapDispatchToProps = {
  getReferenceIdentifiers,
  getTasks,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskInputUpdate);
