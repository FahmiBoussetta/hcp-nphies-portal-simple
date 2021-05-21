import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './list-communication-medium-enum.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IListCommunicationMediumEnumDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ListCommunicationMediumEnumDetail = (props: IListCommunicationMediumEnumDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { listCommunicationMediumEnumEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="listCommunicationMediumEnumDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationMediumEnum.detail.title">ListCommunicationMediumEnum</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{listCommunicationMediumEnumEntity.id}</dd>
          <dt>
            <span id="cm">
              <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationMediumEnum.cm">Cm</Translate>
            </span>
          </dt>
          <dd>{listCommunicationMediumEnumEntity.cm}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationMediumEnum.communication">Communication</Translate>
          </dt>
          <dd>{listCommunicationMediumEnumEntity.communication ? listCommunicationMediumEnumEntity.communication.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/list-communication-medium-enum" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/list-communication-medium-enum/${listCommunicationMediumEnumEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ listCommunicationMediumEnum }: IRootState) => ({
  listCommunicationMediumEnumEntity: listCommunicationMediumEnum.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListCommunicationMediumEnumDetail);
