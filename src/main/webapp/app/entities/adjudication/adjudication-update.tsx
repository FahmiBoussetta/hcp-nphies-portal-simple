import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAdjudicationItem } from 'app/shared/model/adjudication-item.model';
import { getEntities as getAdjudicationItems } from 'app/entities/adjudication-item/adjudication-item.reducer';
import { IAdjudicationDetailItem } from 'app/shared/model/adjudication-detail-item.model';
import { getEntities as getAdjudicationDetailItems } from 'app/entities/adjudication-detail-item/adjudication-detail-item.reducer';
import { IAdjudicationSubDetailItem } from 'app/shared/model/adjudication-sub-detail-item.model';
import { getEntities as getAdjudicationSubDetailItems } from 'app/entities/adjudication-sub-detail-item/adjudication-sub-detail-item.reducer';
import { getEntity, updateEntity, createEntity, reset } from './adjudication.reducer';
import { IAdjudication } from 'app/shared/model/adjudication.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAdjudicationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdjudicationUpdate = (props: IAdjudicationUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { adjudicationEntity, adjudicationItems, adjudicationDetailItems, adjudicationSubDetailItems, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/adjudication');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAdjudicationItems();
    props.getAdjudicationDetailItems();
    props.getAdjudicationSubDetailItems();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...adjudicationEntity,
        ...values,
        adjudicationItem: adjudicationItems.find(it => it.id.toString() === values.adjudicationItemId.toString()),
        adjudicationDetailItem: adjudicationDetailItems.find(it => it.id.toString() === values.adjudicationDetailItemId.toString()),
        adjudicationSubDetailItem: adjudicationSubDetailItems.find(
          it => it.id.toString() === values.adjudicationSubDetailItemId.toString()
        ),
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
          <h2 id="hcpNphiesPortalSimpleApp.adjudication.home.createOrEditLabel" data-cy="AdjudicationCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.home.createOrEditLabel">Create or edit a Adjudication</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : adjudicationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="adjudication-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="adjudication-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="categoryLabel" for="adjudication-category">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.category">Category</Translate>
                </Label>
                <AvField id="adjudication-category" data-cy="category" type="text" name="category" />
              </AvGroup>
              <AvGroup>
                <Label id="reasonLabel" for="adjudication-reason">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.reason">Reason</Translate>
                </Label>
                <AvField id="adjudication-reason" data-cy="reason" type="text" name="reason" />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="adjudication-amount">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.amount">Amount</Translate>
                </Label>
                <AvField id="adjudication-amount" data-cy="amount" type="string" className="form-control" name="amount" />
              </AvGroup>
              <AvGroup>
                <Label id="valueLabel" for="adjudication-value">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.value">Value</Translate>
                </Label>
                <AvField id="adjudication-value" data-cy="value" type="text" name="value" />
              </AvGroup>
              <AvGroup>
                <Label for="adjudication-adjudicationItem">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.adjudicationItem">Adjudication Item</Translate>
                </Label>
                <AvInput
                  id="adjudication-adjudicationItem"
                  data-cy="adjudicationItem"
                  type="select"
                  className="form-control"
                  name="adjudicationItemId"
                >
                  <option value="" key="0" />
                  {adjudicationItems
                    ? adjudicationItems.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="adjudication-adjudicationDetailItem">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.adjudicationDetailItem">Adjudication Detail Item</Translate>
                </Label>
                <AvInput
                  id="adjudication-adjudicationDetailItem"
                  data-cy="adjudicationDetailItem"
                  type="select"
                  className="form-control"
                  name="adjudicationDetailItemId"
                >
                  <option value="" key="0" />
                  {adjudicationDetailItems
                    ? adjudicationDetailItems.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="adjudication-adjudicationSubDetailItem">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.adjudicationSubDetailItem">
                    Adjudication Sub Detail Item
                  </Translate>
                </Label>
                <AvInput
                  id="adjudication-adjudicationSubDetailItem"
                  data-cy="adjudicationSubDetailItem"
                  type="select"
                  className="form-control"
                  name="adjudicationSubDetailItemId"
                >
                  <option value="" key="0" />
                  {adjudicationSubDetailItems
                    ? adjudicationSubDetailItems.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/adjudication" replace color="info">
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
  adjudicationItems: storeState.adjudicationItem.entities,
  adjudicationDetailItems: storeState.adjudicationDetailItem.entities,
  adjudicationSubDetailItems: storeState.adjudicationSubDetailItem.entities,
  adjudicationEntity: storeState.adjudication.entity,
  loading: storeState.adjudication.loading,
  updating: storeState.adjudication.updating,
  updateSuccess: storeState.adjudication.updateSuccess,
});

const mapDispatchToProps = {
  getAdjudicationItems,
  getAdjudicationDetailItems,
  getAdjudicationSubDetailItems,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdjudicationUpdate);
