import React,{Component} from 'react';
import { Row, Col, Button,Pagination } from 'antd';

const Antd = () => (<div>
    <Row>
        <Col span={6}>
            <p>p mark</p>
            <Button type='primary'>hh</Button>
        </Col>
        <Col span={6} offset={6}>
            <Button type='primary'>hhh</Button>
            <p>p mark</p>
        </Col>
    </Row>
    <Row>
        <Col>
            <Pagination defaultCurrent={1} total={50}></Pagination>
        </Col>
    </Row>
</div>)

export default Antd;