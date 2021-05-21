import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prefixes.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrefixesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrefixesDetail = (props: IPrefixesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prefixesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prefixesDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.prefixes.detail.title">Prefixes</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{prefixesEntity.id}</dd>
          <dt>
            <span id="prefix">
              <Translate contentKey="hcpNphiesPortalSimpleApp.prefixes.prefix">Prefix</Translate>
            </span>
          </dt>
          <dd>{prefixesEntity.prefix}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.prefixes.human">Human</Translate>
          </dt>
          <dd>{prefixesEntity.human ? prefixesEntity.human.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/prefixes" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prefixes/${prefixesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prefixes }: IRootState) => ({
  prefixesEntity: prefixes.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrefixesDetail);
