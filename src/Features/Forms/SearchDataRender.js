import React from 'react';
import { Row, Col } from 'antd';
import * as _ from 'lodash';

function SearchDataRender({ searchResp }) {
  console.log(searchResp, "searhcrespo")


  return (
    <>
      <Row gutter={[16, 32]}>
        {Object.keys(searchResp).map((item, i) => {
          const dynamicText = item;
          const HeadingText = dynamicText.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

          if (
            !_.isArray(searchResp[item]) &&
            item !== 'createdDate' &&
            item !== '_class' &&
            item !== '_id'
          ) {
            return (
              <Col span={8} key={i}>
                <Row>
                  <span className="search-header">
                    {searchResp['commissionType'] === 'Tier' ||
                      searchResp['commissionType'] === 'Volume'
                      ? item === 'commissionValue'
                        ? ''
                        : HeadingText
                      : HeadingText}
                  </span>
                </Row>
                <Row>
                  <span className="search-value">
                    {searchResp['commissionType'] === 'Tier' ||
                      searchResp['commissionType'] === 'Volume'
                      ? item === 'commissionValue'
                        ? ''
                        : searchResp[item]
                      : searchResp[item]}
                  </span>
                </Row>
              </Col>
            );
          } else if (item === 'settlementCycle') {
            return (
              <Col span={8} key={i}>
                <Row>
                  <span className="search-header">{HeadingText}</span>
                </Row>
                <Row>
                  {searchResp.settlementCycle &&
                    searchResp.settlementCycle.map((item) => {
                      return (
                        <span className="search-value">
                          {item.from} - {item.to}
                        </span>
                      );
                    })}
                </Row>
              </Col>
            );
          } else if (item === 'commissionRuleRange') {
            if (
              searchResp['commissionType'] === 'Tier' ||
              searchResp['commissionType'] === 'Volume'
            ) {
              return (
                <Row
                  gutter={[16, 32]}
                  style={{ width: '-webkit-fill-available' }}
                >
                  <Col span={8}>
                    <span className="search-header">Range From</span>
                  </Col>
                  <Col span={8}>
                    {' '}
                    <span className="search-header">Range To</span>
                  </Col>
                  <Col span={8}>
                    {' '}
                    <span className="search-header">Amount</span>
                  </Col>
                  {searchResp.commissionRuleRange &&
                    searchResp.commissionRuleRange.map((item) => {
                      return (
                        <>
                          <Col span={8}>
                            <span className="search-value">
                              {item.rangeFrom}
                            </span>
                          </Col>
                          <Col span={8}>
                            <span className="search-value">{item.rangeTo}</span>
                          </Col>
                          <Col span={8}>
                            <span className="search-value">
                              {item.rangeValue}
                            </span>
                          </Col>
                        </>
                      );
                    })}
                </Row>
              );
            } else {
              return null;
            }
          }
        })}

        {/* {searchResp?.settlementRange && (
          <Row gutter={[16, 32]} style={{ width: '-webkit-fill-available' }}>
            <Col span={8}>
              <span className="search-header">Range From</span>
            </Col>
            <Col span={8}>
              {' '}
              <span className="search-header">Range To</span>
            </Col>
            <Col span={8}>
              {' '}
              <span className="search-header">Amount</span>
            </Col>
            {searchResp.settlementRange &&
              searchResp.settlementRange.map((item) => {
                return (
                  <>
                    <Col span={8}>
                      <span className="search-value">{item.rangeFrom}</span>
                    </Col>
                    <Col span={8}>
                      <span className="search-value">{item.rangeTo}</span>
                    </Col>
                    <Col span={8}>
                      <span className="search-value">{item.amount}</span>
                    </Col>
                  </>
                );
              })}
          </Row>
        )} */}

        {/* {searchResp?.commissionRuleRange && (
          <Row gutter={[16, 32]} style={{ width: '-webkit-fill-available' }}>
            <Col span={8}>
              <span className="search-header">Range From</span>
            </Col>
            <Col span={8}>
              {' '}
              <span className="search-header">Range To</span>
            </Col>
            <Col span={8}>
              {' '}
              <span className="search-header">Amount</span>
            </Col>
            {searchResp.commissionRuleRange &&
              searchResp.commissionRuleRange.map((item) => {
                return (
                  <>
                    <Col span={8}>
                      <span className="search-value">{item.rangeFrom}</span>
                    </Col>
                    <Col span={8}>
                      <span className="search-value">{item.rangeTo}</span>
                    </Col>
                    <Col span={8}>
                      <span className="search-value">{item.rangeValue}</span>
                    </Col>
                  </>
                );
              })}
          </Row>
        )} */}
      </Row>
    </>
  );
}

export default React.memo(SearchDataRender);
