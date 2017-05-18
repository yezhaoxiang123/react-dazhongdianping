import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import HomeAd from 'components//HomeAd';
import AdData from '../../../../mock/home/ad';
import {getAdData} from '../../../../fetch/home/home';

class Ad extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin
      .shouldComponentUpdate
      .bind(this);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const result = getAdData();
    result.then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return AdData;
      }
    }).then(json => {
      const data = json;
      if (data.length) {
        this.setState({data: data});
      }
    }).catch(err => {
      console.log(err.message);
    })
  }

  render() {
    return (
      <div>
        {this.state.data.length
          ? <HomeAd data={this.state.data}/>
          : <div>加载中...</div>}
      </div>
    )
  }
}

export default Ad