import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHumanName } from 'app/shared/model/human-name.model';
import { getEntities as getHumanNames } from 'app/entities/human-name/human-name.reducer';
import { getEntity, updateEntity, createEntity, reset } from './prefixes.reducer';
import { IPrefixes } from 'app/shared/model/prefixes.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrefixesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrefixesUpdate = (props: IPrefixesUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { prefixesEntity, humanNames, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prefixes');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getHumanNames();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...prefixesEntity,
        ...values,
        human: humanNames.find(it => it.id.toString() === values.humanId.toString()),
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
          <h2 id="hcpNphiesPortalSimpleApp.prefixes.home.createOrEditLabel" data-cy="PrefixesCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.prefixes.home.createOrEditLabel">Create or edit a Prefixes</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prefixesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prefixes-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="prefixes-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="prefixLabel" for="prefixes-prefix">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.prefixes.prefix">Prefix</Translate>
                </Label>
                <AvField id="prefixes-prefix" data-cy="prefix" type="text" name="prefix" />
              </AvGroup>
              <AvGroup>
                <Label for="prefixes-human">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.prefixes.human">Human</Translate>
                </Label>
                <AvInput id="prefixes-human" data-cy="human" type="select" className="form-control" name="humanId">
                  <option value="" key="0" />
                  {humanNames
                    ? humanNames.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prefixes" replace color="info">
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
  humanNames: storeState.humanName.entities,
  prefixesEntity: storeState.prefixes.entity,
  loading: storeState.prefixes.loading,
  updating: storeState.prefixes.updating,
  updateSuccess: storeState.prefixes.updateSuccess,
});

const mapDispatchToProps = {
  getHumanNames,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrefixesUpdate);
