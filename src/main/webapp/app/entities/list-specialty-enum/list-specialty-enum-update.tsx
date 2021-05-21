import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPractitionerRole } from 'app/shared/model/practitioner-role.model';
import { getEntities as getPractitionerRoles } from 'app/entities/practitioner-role/practitioner-role.reducer';
import { getEntity, updateEntity, createEntity, reset } from './list-specialty-enum.reducer';
import { IListSpecialtyEnum } from 'app/shared/model/list-specialty-enum.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IListSpecialtyEnumUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ListSpecialtyEnumUpdate = (props: IListSpecialtyEnumUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { listSpecialtyEnumEntity, practitionerRoles, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/list-specialty-enum');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPractitionerRoles();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...listSpecialtyEnumEntity,
        ...values,
        practitionerRole: practitionerRoles.find(it => it.id.toString() === values.practitionerRoleId.toString()),
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
          <h2 id="hcpNphiesPortalSimpleApp.listSpecialtyEnum.home.createOrEditLabel" data-cy="ListSpecialtyEnumCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.home.createOrEditLabel">
              Create or edit a ListSpecialtyEnum
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : listSpecialtyEnumEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="list-specialty-enum-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="list-specialty-enum-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sLabel" for="list-specialty-enum-s">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.s">S</Translate>
                </Label>
                <AvInput
                  id="list-specialty-enum-s"
                  data-cy="s"
                  type="select"
                  className="form-control"
                  name="s"
                  value={(!isNew && listSpecialtyEnumEntity.s) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.SpecialtyEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="list-specialty-enum-practitionerRole">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.practitionerRole">Practitioner Role</Translate>
                </Label>
                <AvInput
                  id="list-specialty-enum-practitionerRole"
                  data-cy="practitionerRole"
                  type="select"
                  className="form-control"
                  name="practitionerRoleId"
                >
                  <option value="" key="0" />
                  {practitionerRoles
                    ? practitionerRoles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/list-specialty-enum" replace color="info">
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
  practitionerRoles: storeState.practitionerRole.entities,
  listSpecialtyEnumEntity: storeState.listSpecialtyEnum.entity,
  loading: storeState.listSpecialtyEnum.loading,
  updating: storeState.listSpecialtyEnum.updating,
  updateSuccess: storeState.listSpecialtyEnum.updateSuccess,
});

const mapDispatchToProps = {
  getPractitionerRoles,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialtyEnumUpdate);
