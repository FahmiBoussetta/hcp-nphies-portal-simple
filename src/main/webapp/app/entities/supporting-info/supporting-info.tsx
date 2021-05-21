import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './supporting-info.reducer';
import { ISupportingInfo } from 'app/shared/model/supporting-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupportingInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SupportingInfo = (props: ISupportingInfoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { supportingInfoList, match, loading } = props;
  return (
    <div>
      <h2 id="supporting-info-heading" data-cy="SupportingInfoHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.home.title">Supporting Infos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.home.createLabel">Create new Supporting Info</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {supportingInfoList && supportingInfoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.sequence">Sequence</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeLOINC">Code LOINC</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeVisit">Code Visit</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeFdiOral">Code Fdi Oral</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.timing">Timing</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.timingEnd">Timing End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueBoolean">Value Boolean</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueString">Value String</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.reason">Reason</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.reasonMissingTooth">Reason Missing Tooth</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueQuantity">Value Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueAttachment">Value Attachment</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueReference">Value Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.claim">Claim</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {supportingInfoList.map((supportingInfo, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${supportingInfo.id}`} color="link" size="sm">
                      {supportingInfo.id}
                    </Button>
                  </td>
                  <td>{supportingInfo.sequence}</td>
                  <td>{supportingInfo.codeLOINC}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.SupportingInfoCategoryEnum.${supportingInfo.category}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.SupportingInfoCodeVisitEnum.${supportingInfo.codeVisit}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.SupportingInfoCodeFdiEnum.${supportingInfo.codeFdiOral}`} />
                  </td>
                  <td>
                    {supportingInfo.timing ? <TextFormat type="date" value={supportingInfo.timing} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {supportingInfo.timingEnd ? <TextFormat type="date" value={supportingInfo.timingEnd} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{supportingInfo.valueBoolean ? 'true' : 'false'}</td>
                  <td>{supportingInfo.valueString}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.SupportingInfoReasonEnum.${supportingInfo.reason}`} />
                  </td>
                  <td>
                    <Translate
                      contentKey={`hcpNphiesPortalSimpleApp.SupportingInfoReasonMissingToothEnum.${supportingInfo.reasonMissingTooth}`}
                    />
                  </td>
                  <td>
                    {supportingInfo.valueQuantity ? (
                      <Link to={`quantity/${supportingInfo.valueQuantity.id}`}>{supportingInfo.valueQuantity.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {supportingInfo.valueAttachment ? (
                      <Link to={`attachment/${supportingInfo.valueAttachment.id}`}>{supportingInfo.valueAttachment.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {supportingInfo.valueReference ? (
                      <Link to={`reference-identifier/${supportingInfo.valueReference.id}`}>{supportingInfo.valueReference.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{supportingInfo.claim ? <Link to={`claim/${supportingInfo.claim.id}`}>{supportingInfo.claim.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${supportingInfo.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${supportingInfo.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${supportingInfo.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.home.notFound">No Supporting Infos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ supportingInfo }: IRootState) => ({
  supportingInfoList: supportingInfo.entities,
  loading: supportingInfo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupportingInfo);
