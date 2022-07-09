import React, { Component } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import WorldMap from './WorldMap';
import { NEARBY_SATELLITE, SAT_API_KEY, SATELLITE_CATEGORY } from "../constants";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            satInfo: null,
            satList:null,
            setting: null,
            isLoadingList: false
        }
    }

    render() {
        const { isLoadingList, satInfo, satList, setting } = this.state;
        return (
            <Row className='main'>
                <Col span={8} className='left-side'>
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList satInfo={satInfo} isLoad={isLoadingList} onShowMap={this.showMap}/>
                </Col>
                <Col span={16} className='right-side'>
                    <WorldMap satData={satList} observerData={setting} />
                </Col>
            </Row>
        );
    }

    showNearbySatellite = (setting) => {
        this.setState({
            isLoadingList: true,
            setting: setting
        })
        this.fetchSatellite(setting);
    }

    fetchSatellite = (setting) => {
        const {latitude, longitude, altitude, radius} = setting;
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${altitude}/${radius}/${SATELLITE_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        
        axios.get(url)
            .then(response => {
                console.log(response.data)
                this.setState({
                    satInfo: response.data
                })
            })
            .catch(error => {
                console.log('error in fetch satellite -> ', error);
            })
            .finally(() => {
                this.setState({
                    isLoadingList:false
                })
            })
    }

    showMap = (selected) => {
        this.setState(preState => ({
          ...preState,
          satList: [...selected]
        }));
    };
}
 
export default Main;