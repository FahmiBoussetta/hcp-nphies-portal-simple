import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './texts.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITextsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TextsDetail = (props: ITextsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { textsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="textsDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.texts.detail.title">Texts</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{textsEntity.id}</dd>
          <dt>
            <span id="textName">
              <Translate contentKey="hcpNphiesPortalSimpleApp.texts.textName">Text Name</Translate>
            </span>
          </dt>
          <dd>{textsEntity.textName}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.texts.human">Human</Translate>
          </dt>
          <dd>{textsEntity.human ? textsEntity.human.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/texts" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/texts/${textsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ texts }: IRootState) => ({
  textsEntity: texts.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TextsDetail);
